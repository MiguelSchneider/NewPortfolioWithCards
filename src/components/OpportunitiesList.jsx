/**
 * OpportunitiesList.jsx
 *
 * Groups raw opportunity data into logical sets for display.
 * Uses useMemo to efficiently memoize grouping computations.
 * Renders a responsive grid of OpportunityGroupCard components.
 */
import React, { useMemo } from 'react'
import { Box } from '@mui/material'
import OpportunityGroupCard from './OpportunityGroupCard'

export default function OpportunitiesList({ opportunities }) {
    // Group opportunities by their metaOpportunityId (or fallback to opportunityId) for card rendering.
    const groups = useMemo(() => {
        const map = {}
        opportunities.forEach((opp) => {
            const key = opp.belongsToMetaOpportunityId ?? opp.opportunityId
            if (!map[key]) map[key] = []
            map[key].push(opp)
        })
        return Object.values(map)
    }, [opportunities])

    // Layout container: flex-wrap grid with centered cards and uniform gap.
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
            {/* Iterate through each grouped array to render its corresponding card. */}
            {groups.map((group) => {
                const key = group[0].belongsToMetaOpportunityId ?? group[0].opportunityId
                // Card wrapper: fixed-width, responsive box for each opportunity group.
                return (
                    <Box
                        key={key}
                        sx={{
                            // each card box is 340px wide, shrinking to 100% on very small screens
                            // flex: '0 1 340px',  
                            display: 'flex',
                            flexDirection: 'column',
                            width: '340px', // minimum width for each card           
                        }}
                    >
                        <OpportunityGroupCard group={group} />
                    </Box>
                )
            })}
        </Box>
    )
}