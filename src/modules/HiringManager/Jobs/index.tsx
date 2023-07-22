import { Box, Drawer, Paper, Stack, Typography } from '@mui/material'
import JobCard from 'components/JobCard'
import EditIcon from '@mui/icons-material/Edit'
import AddCircleRounded from '@mui/icons-material/AddCircleRounded'
import { Button } from 'components/Button/Button'
import { JobType } from 'types/Jobs.type'
import { useJobsStore } from 'stores/jobs.store'
import { useEffect, useState } from 'react'
import HiringManagerForm from '../Form'

interface Props {
  list?: JobType[]
  setSuccess: (value: boolean) => void
}

function Jobs ({ list, setSuccess }: Props) {
  const { setJob } = useJobsStore()
  const [isDrawerActive, setDrawer] = useState(false)
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)

  useEffect(() => {
    console.log(currentIndex, 'currentIndex')
  }, [currentIndex])

  return (
    <>
      <Box>
        <Button
          color='primary'
          labelColor='primary'
          variant='text'
          label='Add Job'
          startIcon={<AddCircleRounded />}
          onClick={() => {
            setJob(null)
            setDrawer(true)
          }}
        />
      </Box>
      {list && list?.length > 0 ? (
        <>
          {list?.map((job, index) => {
            return (
              <Paper key={index} sx={{ width: '100%' }}>
                <JobCard job={job}>
                  <Button
                    label='Edit'
                    variant='text'
                    labelColor='primary'
                    color='primary'
                    startIcon={<EditIcon />}
                    onClick={() => {
                      setJob(list[index])
                      setCurrentIndex(index)
                      setDrawer(true)
                    }}
                  />
                </JobCard>
              </Paper>
            )
          })}
        </>
      ) : (
        <Paper sx={{ width: '100%' }}>
          <Stack alignItems='center' my={2}>
            <Typography variant='Overline2'>No Job posting.</Typography>
          </Stack>
        </Paper>
      )}

      <Drawer open={isDrawerActive} onClose={() => setDrawer(false)}>
        <Box width={500}>
          <HiringManagerForm
            jobs={list}
            currentIndex={currentIndex}
            callback={() => setSuccess(true)}
            onClose={() => setDrawer(false)}
          />
        </Box>
      </Drawer>
    </>
  )
}

export { Jobs }
