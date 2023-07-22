import { Box } from '@mui/material'
import { CandidateCard } from 'components/CandidateCard'
import { useRouter } from 'next/router'
import { CandidateType } from 'types/Candidate.type'

interface Props {
  list?: CandidateType[]
}

function Candidates ({ list }: Props) {
  const router = useRouter()
  return (
    <>
      {list?.map((candidate, index) => {
        if (candidate?.first_name === null) {
          return null
        }

        return (
          <Box
            key={index}
            onClick={() =>
              router.push(`/hiring-manager/developer/${candidate?.userId}`)}
            sx={{ cursor: 'pointer' }}
          >
            <CandidateCard candidate={candidate} />
          </Box>
        )
      })}
    </>
  )
}

export { Candidates }
