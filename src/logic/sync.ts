import { getLastSyncTime } from 'store/serverData'
import { getToken } from 'store/token'
import { setPending } from 'store/isPending'
import { saveDataLocally } from 'logic/localData'
import { sendEvent } from 'helpers/tracking'
import { updateData } from 'store/commonActions'
import { setSyncData } from 'store/lastSync'
import { formatDate } from 'helpers/format'
import { AppThunk } from 'store'
import { Diff, LocalData } from 'types'
import { sync } from 'worker'
import { toServer } from 'worker/zmAdapter'

/** All syncs with zenmoney goes through this thunk */
export const syncData = (): AppThunk => async (dispatch, getState) => {
  const state = getState()
  const diff = toServer(state.data.diff || {})
  diff.serverTimestamp = getLastSyncTime(state) / 1000 || 0
  const token = getToken(state) || ''

  const syncStartTime = Date.now()
  dispatch(setPending(true))
  const response = await sync(token, diff)
  dispatch(setPending(false))
  dispatch(
    setSyncData({
      isSuccessful: !response.error,
      finishedAt: Date.now(),
      errorMessage: response.error || null,
    })
  )

  if (response.data) {
    const data = response.data as Diff
    sendEvent(
      `Sync: ${data.serverTimestamp ? 'Successful update' : 'Successful first'}`
    )
    dispatch(updateData({ data, syncStartTime }))
    const changedDomains = getChangedDomains(data)
    dispatch(saveDataLocally(changedDomains))
    console.log(`✅ Данные обновлены ${formatDate(new Date(), 'HH:mm:ss')}`)
  } else {
    console.warn('Syncing failed', response.error)
    sendEvent(`Error: ${response.error}`)
    // captureError(err)
  }
}
type LocalKey = keyof LocalData
const domains: LocalKey[] = [
  'serverTimestamp',
  'instrument',
  'company',
  'user',
  'account',
  'tag',
  'merchant',
  'budget',
  'reminder',
  'reminderMarker',
  'transaction',
]

function getChangedDomains(data: Diff) {
  let changedDomains: LocalKey[] = []
  function add(key: LocalKey) {
    if (changedDomains.includes(key)) return
    changedDomains.push(key)
  }
  domains.forEach(key => {
    if (data[key]) add(key)
  })
  if (data.deletion) data.deletion.forEach(item => add(item.object))
  return changedDomains
}
