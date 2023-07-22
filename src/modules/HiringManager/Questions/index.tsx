import { Box, Drawer, Paper, Stack, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import AddCircleRounded from '@mui/icons-material/AddCircleRounded'
import { Button } from 'components/Button/Button'
import { useState } from 'react'
import QuestionForm from '../QuestionForm'
import { QuestionType } from 'types/Question.type'

interface Props {
  list?: QuestionType[]
  setSuccess: (value: boolean) => void
}

function Questions ({ list, setSuccess }: Props) {
  const [isDrawerActive, setDrawer] = useState(false)
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)

  console.log(list, 'list')

  return (
    <>
      <Box>
        <Button
          color='primary'
          labelColor='primary'
          variant='text'
          label='Add Question'
          startIcon={<AddCircleRounded />}
          onClick={() => {
            setDrawer(true)
          }}
        />
      </Box>
      {list && list?.length > 0 ? (
        <>
          {list?.map((item, index) => {
            return (
              <Paper key={index} sx={{ width: '100%', px: 3, py: 2 }}>
                <Stack
                  flexDirection='row'
                  alignItems='center'
                  justifyContent='space-between'
                >
                  <Typography variant='Overline2'>{item?.question}</Typography>

                  <Box>
                    <Button
                      label='Edit'
                      variant='text'
                      labelColor='primary'
                      color='primary'
                      startIcon={<EditIcon />}
                      onClick={() => {
                        setCurrentIndex(index)
                        setDrawer(true)
                      }}
                    />
                  </Box>
                </Stack>
              </Paper>
            )
          })}
        </>
      ) : (
        <Paper sx={{ width: '100%' }}>
          <Stack alignItems='center' my={2}>
            <Typography variant='Overline2'>No Questions</Typography>
          </Stack>
        </Paper>
      )}

      <Drawer open={isDrawerActive} onClose={() => setDrawer(false)}>
        <Box width={500}>
          <QuestionForm
            questions={list ?? []}
            currentIndex={currentIndex}
            callback={() => setSuccess(true)}
            onClose={() => setDrawer(false)}
          />
        </Box>
      </Drawer>
    </>
  )
}

export { Questions }
