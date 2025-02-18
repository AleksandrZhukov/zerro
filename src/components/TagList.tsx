import React, { FC } from 'react'
import { Box, BoxProps, IconButton } from '@mui/material'
import TagSelect2 from 'components/TagSelect2'
import TagChip from 'components/TagChip'
import { Tooltip } from 'components/Tooltip'
import AddIcon from '@mui/icons-material/Add'
import { Modify } from 'types'

type TagListProps = Modify<
  BoxProps,
  {
    tags: string[] | null
    onChange: (tags: string[]) => void
    tagType: 'income' | 'outcome' | null
  }
>
export const TagList: FC<TagListProps> = props => {
  const { tags = null, onChange, tagType, ...rest } = props
  const removeTag = (removeId: string) =>
    tags && onChange(tags.filter(id => id !== removeId))
  const replaceTag = (oldId: string, newId: string) =>
    tags && onChange(tags.map(id => (id === oldId ? newId : id)))
  const addTag = (id: string) => onChange(tags ? [...tags, id] : [id])

  return (
    <Box {...rest}>
      {tags?.map(id => (
        <TagSelect2
          key={id}
          onChange={newId => replaceTag(id, newId)}
          exclude={tags}
          tagType={tagType}
          trigger={
            <Box mr={1} my={0.5} display="inline-block">
              <TagChip id={id} onDelete={() => removeTag(id)} />
            </Box>
          }
        />
      ))}
      <TagSelect2
        onChange={id => addTag(id)}
        exclude={tags}
        tagType={tagType}
        trigger={
          <Box my={0.5} display="inline-block">
            <Tooltip title="Добавить категорию">
              <IconButton
                edge="end"
                size="small"
                children={<AddIcon fontSize="inherit" />}
              />
            </Tooltip>
          </Box>
        }
      />
    </Box>
  )
}
