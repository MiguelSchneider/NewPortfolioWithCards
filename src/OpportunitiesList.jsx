// src/components/OpportunitiesList.jsx
import React, { useMemo } from 'react'
import { Box } from '@mui/material'
import OpportunityGroupCard from './OpportunityGroupCard'
import opportunities from './OpportunitiesJSON'

export default function OpportunitiesList() {
    const groups = useMemo(() => {
        const map = {}
        opportunities.forEach((opp) => {
            const key = opp.metaOpportunityId ?? opp.opportunityId
            if (!map[key]) map[key] = []
            map[key].push(opp)
        })
        return Object.values(map)
    }, [])

    return (
        <Box
            component="section"
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,               // spacing between cards (theme spacing units)
                justifyContent: 'flex-start',
                p: 2,
            }}
        >
            {groups.map((group) => {
                const key = group[0].metaOpportunityId ?? group[0].opportunityId
                return (
                    <Box
                        key={key}
                        sx={{
                            // each card box is 300px wide, shrinking to 100% on very small screens
                            //   flex: '0 1 380px',
                            flex: '0 1 320px',
                            // flex: '0 1 100%',
              
                        }}
                    >
                        <OpportunityGroupCard group={group} />
                    </Box>
                )
            })}
        </Box>
    )
}