// src/components/OpportunitiesList.jsx
import React, { useMemo } from 'react'
import { Box } from '@mui/material'
import OpportunityGroupCard from './OpportunityGroupCard'
import opportunities from '../data/OpportunitiesJSON'

export default function OpportunitiesList() {
    const groups = useMemo(() => {
        const map = {}
        opportunities.forEach((opp) => {
            const key = opp.belongsToMetaOpportunityId ?? opp.opportunityId
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
                justifyContent: 'center',
                p: 2,
            }}
        >
            {groups.map((group) => {
                const key = group[0].belongsToMetaOpportunityId ?? group[0].opportunityId
                return (
                    <Box
                        key={key}
                        sx={{
                            // each card box is 300px wide, shrinking to 100% on very small screens
                            //   flex: '0 1 380px',
                            flex: '0 1 340px',
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