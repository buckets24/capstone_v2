import { Divider, Stack } from '@mui/material'
import { Box } from '@mui/system'
import BadgeLabel from 'common/components/Typography/BadgeLabel'
import Body2 from 'common/components/Typography/Body2'
import Body3 from 'common/components/Typography/Body3'
import H7 from 'common/components/Typography/H7'
import { FC } from 'react'

interface TransactionCardsProps {
  data: Record<string, string>[]
}

const TransactionCards: FC<TransactionCardsProps> = ({ data }) => {
  return (
    <Stack gap={1}>
      {data?.map((item) => (
        <Box
          key={item.id}
          p={2}
          sx={{
            borderStyle: 'solid',
            borderColor: 'ink.12',
            borderTopWidth: '1px',
            borderBottomWidth: '1px',
            borderRightWidth: 0,
            borderLeftWidth: 0,
            bgcolor: 'common.white'
          }}
        >
          <Stack
            flexDirection='row'
            alignItems='center'
            justifyContent='space-between'
            pb={1}
          >
            <H7 text={item?.price} />
            <Body3 text={item?.soldMonth} />
          </Stack>
          <Stack pb={2}>
            <Body2 text={item?.address} />
          </Stack>
          <Divider />
          <Stack
            flexDirection='row'
            alignItems='center'
            justifyContent='space-between'
            pt={1.5}
          >
            <BadgeLabel
              light
              text={item?.area}
            />
            <BadgeLabel
              light
              text={item?.floor}
            />
            <BadgeLabel
              light
              text={item?.propertyType}
            />
          </Stack>
        </Box>
      ))}
    </Stack>
  )
}

export { TransactionCards }
