// OpportunityGroupCard.jsx
// Renders a card UI for a group of related investment opportunities.
// Allows the user to view details, select a specific chain if multiple networks are available,
// and initiate an investment action.

import React, { useState } from 'react'
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Chip,
    Button,
    Avatar,
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material'

// OpportunityGroupCard component
// Props:
//  - group: array of opportunity objects grouped by metaOpportunityId or opportunityId.
export default function OpportunityGroupCard({ group }) {
    // State to track the currently selected opportunity within the group.
    // Defaults to the first item in the group.
    const [selectedId, setSelectedId] = useState(group[0].opportunityId)
    // Derive the currently selected opportunity object based on selectedId.
    const selected = group.find((o) => o.opportunityId === selectedId)
    // Utility formatter for currency amounts with no decimal places.
    const fmt = (amt, curr) =>
        new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: curr,
            maximumFractionDigits: 0,
        }).format(amt)

    // Outer card container with flex layout to stretch content vertically.
    return (
        <Card
            sx={{
                width: '100%',       // fill the 300px box (or shrink smaller if needed)
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Image container with positioned overlays for labels and network icons. */}
            <Box sx={{ position: 'relative' }}>
                {/* Display the main image for the selected opportunity. */}
                <CardMedia
                    component="img"
                    image={selected.image}
                    alt={selected.opportunityName}
                    sx={{ width: '100%', height: 160, objectFit: 'cover' }} />
                {/* Render status label chips (e.g., "Always Open", "Qualified") over the image. */}
                <Box sx={{ position: 'absolute', top: 8, left: 8, display: 'flex', gap: 1, }}>
                    {selected.labels?.map((lbl) => (
                        <Chip
                            key={lbl}
                            label={
                                lbl === 'alwaysOpen'
                                    ? 'Always Open'
                                    : lbl === 'qualifiedPurchasers'
                                        ? 'Qualified'
                                        : lbl
                            }
                            size="small"
                            color={lbl.includes('qualified') ? 'secondary' : 'primary'}
                            sx={{
                                textTransform: 'capitalize',
                                backgroundColor: 'white',
                                color: 'black',
                                borderRadius: '4px',
                                height: '20px',
                                fontSize: '0.65rem',
                                fontWeight: 500,
                            }}
                        />
                    ))}
                </Box>
                {/* Render small avatar icons for each network in the group at the bottom-right. */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 1,
                    position: 'absolute',
                    bottom: 0,
                    right: 8,
                    display: 'flex',
                    gap: 1
                }}>
                    {group.map((opp) => (
                        opp.networkIcon && (
                            <Avatar
                                key={opp.opportunityId}
                                src={opp.networkIcon}
                                variant="circular"
                                sx={{
                                    width: 12,
                                    height: 12,
                                    backgroundColor: 'white',
                                }}
                            />
                        )
                    ))}
                </Box>

            </Box>

            {/* Card content area: contains the title, issuer, chain selector, description, features, and tags. */}
            <CardContent sx={{ flexGrow: 1}}>
                <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: 'space-between',mb: 2 }}>
                    {/* Header section: token icon avatar and opportunity name with issuer subtitle. */}
                    <Box sx={{ display: 'flex', alignItems: 'center',   mb: 2}}>
                        <Avatar src={selected.tokenIcon} sx={{ width: 30, height: 30, mr: 1 }} />
                        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: 'left', mb: 0, fontSize: "18px" }}>
                            {selected.opportunityName}
                            <Box sx={{ display: 'flex', alignItems: 'left', mb: 0 }}>
                                <Typography sx={{ fontVariant: 'small-caps', fontSize: "10px", fontWeight: "bold", marginTop: "0px" }} color="text.secondary">
                                    {selected.issuerName}
                                </Typography>
                            </Box>
                        </Box>

                    </Box>

                    {/* If multiple chains are available, render a dropdown to select the active chain. */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                        {group.length > 0 && (
                            <FormControl size="small" sx={{ mr: 2, minWidth: '70%' }}>
                                <InputLabel id="select-chain-label" >Select Chain</InputLabel>
                                <Select
                                    labelId="select-chain-label"
                                    id="select-chain-select"
                                    value={selectedId}
                                    onChange={(e) => setSelectedId(e.target.value)}
                                    label="Select Chain"
                                >
                                    {group.map((opp) => (
                                        <MenuItem key={opp.opportunityId} value={opp.opportunityId}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                                                {(opp.networkIcon || opp.tokenIcon) && (
                                                    <Avatar
                                                        src={opp.networkIcon ?? opp.tokenIcon}
                                                        sx={{ width: 20, height: 20, mr: 1 }}
                                                    />
                                                )}
                                                <Typography variant="body2">
                                                    {opp.network ?? `#${opp.opportunityId}`}
                                                </Typography>
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}

                        {/* Invest button opens the opportunity dashboard in a new tab. */}
                        <Button
                            variant="contained"
                            size="small"
                            href={selected.dashboardUrl}
                            target="_blank"
                            // sx={{ ml: group.length > 1 ? 1 : 0 }}
                        >
                            Invest
                        </Button>
                    </Box>
                </Box>

                {/* Display the opportunity description text. */}
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2, mb: 2 }}>
                    {selected.description}
                </Typography>


                {/* If opportunityFeatures exist, render a styled list of key-value feature rows. */}
                {selected.opportunityFeatures && selected.opportunityFeatures.length > 0 && (
                    <Box sx={{ mb: 2, border: '1px solid #ccc', borderRadius: '4px', padding: 1 }}>
                        {selected.opportunityFeatures.map((feat, idx) => (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: "row",
                                    alignItems: 'center',
                                    justifyContent: "space-between",
                                    mb: 0.0,
                                    padding: 0.4,
                                    fontSize: "12px",
                                    backgroundColor: idx % 2 === 0 ? '#ebebeb' : 'white',
                                }}
                                key={feat.feature}
                            >
                                <Box >
                                    <strong>{feat.feature}</strong>:
                                </Box>
                                <Box sx={{}}>
                                    {feat.value}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                )}

                {/* Render tags as small outlined chips to indicate categories. */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.tags.map((t) => (

                        <Chip key={t} label={t} size="small" variant="outlined"
                            sx={{
                                textTransform: 'capitalize',
                                backgroundColor: '#ebebeb',
                                color: '#7f7f7f',
                                borderRadius: '4px',
                                px: 0.1,
                                py: 0.5,
                                fontSize: '0.65rem',
                                fontWeight: 500,
                            }} />
                    ))}
                </Box>

            </CardContent>

        </Card>
    )
}
