/**
 * OpportunityGroupCard.jsx
 *
 * Renders a detailed, interactive card for a set of related investment opportunities.
 * Supports:
 *  - Displaying a generic meta-opportunity overview.
 *  - Selecting among multiple chain-specific opportunities.
 *  - Showing opportunity features, description, and tags.
 *  - Initiating an investment via an external dashboard link.
 *
 * Props:
 *  - group: Array of opportunity objects. Each object may represent either:
 *      1) A generic meta-opportunity (has metaOpportunityId).
 *      2) A chain-specific opportunity (has opportunityId and optionally network icons).
 *
 * Internally this component:
 *  - Manages selectedId state to track which opportunity the user has chosen.
 *  - Segregates the meta-opportunity and children (chain-specific items).
 *  - Formats currency values via Intl.NumberFormat.
 *  - Conditionally renders UI controls and animations.
 */
import React, { useState, useMemo } from 'react'
import { Card, CardMedia, CardContent, Typography, Chip, Button, Avatar, Box, Select, MenuItem, FormControl } from '@mui/material';

// Helper to render status labels
const StatusLabels = ({ labels }) => (
  <Box sx={{ position: 'absolute', top: 8, left: 8, display: 'flex', gap: 1 }}>
    {labels?.map((lbl) => (
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
);

// Helper to render network avatars
const NetworkAvatars = ({ group }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      mb: 1,
      position: 'absolute',
      bottom: 0,
      right: 8,
    }}
  >
    {group.map((opp) =>
      opp.networkIcon ? (
        <Avatar
          key={opp.opportunityId}
          src={opp.networkIcon}
          variant="circular"
          sx={{ width: 12, height: 12, backgroundColor: 'white' }}
        />
      ) : null
    )}
  </Box>
);

// Helper for chain selector and invest button
const ChainSelector = ({ children, selected, setSelectedId }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0, p: 1 }}>
    {children.length > 0 && (
      <FormControl size="small" sx={{ mr: 1, minWidth: '70%' }}>
        <Select
          value={selected.opportunityId}
          onChange={(e) => setSelectedId(e.target.value)}
          displayEmpty
          renderValue={(value) => {
            const opp = children.find((o) => o.opportunityId === value);
            if (!value || !opp) {
              return <Typography sx={{ fontSize: '0.75rem', color: '#999' }}>Select Chain</Typography>;
            }
            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {(opp.networkIcon || opp.tokenIcon) && (
                  <Avatar src={opp.networkIcon ?? opp.tokenIcon} sx={{ width: 20, height: 20, mr: 1 }} />
                )}
                <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                  {opp.network ?? `#${value}`}
                </Typography>
              </Box>
            );
          }}
        >
          <MenuItem value="" disabled>
            Select Chain
          </MenuItem>
          {children.map((opp) => (
            <MenuItem key={opp.opportunityId} value={opp.opportunityId}>
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                {(opp.networkIcon || opp.tokenIcon) && (
                  <Avatar src={opp.networkIcon ?? opp.tokenIcon} sx={{ width: 20, height: 20, mr: 1 }} />
                )}
                <Typography variant="body2">{opp.network ?? `#${opp.opportunityId}`}</Typography>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )}
    {!selected.metaOpportunityId && (
    <Button variant="contained" size="small" href={'https://id.securitize.io/primary-market/opportunities/'+selected.opportunityId} target="_blank">
        Invest
      </Button>
    )}
  </Box>
);

// Helper to render feature list
const FeatureList = ({ features }) => (
  <Box
    sx={{
      mb: 2,
      border: '1px solid #ccc',
      borderRadius: '4px',
      padding: 1,
      margin: 1,
      transformStyle: 'preserve-3d',
      animation: 'flipIn 0.6s',
      '@keyframes flipIn': {
        '0%': { transform: 'rotateY(90deg)', opacity: 0 },
        '100%': { transform: 'rotateY(0deg)', opacity: 1 },
      },
    }}
  >
    {features.map((feat, idx) => (
      <Box
        key={feat.feature}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 0,
          padding: 0.4,
          fontSize: '12px',
          backgroundColor: idx % 2 === 0 ? '#ebebeb' : 'white',
        }}
      >
        <Box><strong>{feat.feature}</strong>:</Box>
        <Box>{feat.value}</Box>
      </Box>
    ))}
  </Box>
);

// Helper to render tags
const TagChips = ({ tags }) => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, padding: 1 }}>
    {tags.map((t) => (
      <Chip
        key={t}
        label={t}
        size="small"
        variant="outlined"
        sx={{
          textTransform: 'capitalize',
          backgroundColor: '#ebebeb',
          color: '#7f7f7f',
          borderRadius: '4px',
          px: 0.1,
          py: 0.5,
          fontSize: '0.65rem',
          fontWeight: 500,
        }}
      />
    ))}
  </Box>
);

// State and grouping variables:
// selectedId: currently chosen chain-specific opportunity ID (defaults to first in group).
// selected: the opportunity object matching selectedId.
// meta: the generic meta-opportunity object for fallback display.
// children: array of only chain-specific opportunity objects.
export default function OpportunityGroupCard({ group }) {
    // State to track the currently selected opportunity within the group.
    // Defaults to the first item in the group.
    const [selectedId, setSelectedId] = useState(group[0].opportunityId)
    // Memoize selected and children for efficiency.
    const selected = useMemo(() => group.find((o) => o.opportunityId === selectedId), [group, selectedId]);
    const children = useMemo(() => group.filter((o) => o.metaOpportunityId === undefined), [group]);

    // Render the MUI Card with flex layout to occupy full height and stack content vertically.
    return (
        <Card
            sx={{
                width: '100%',       // fill the 300px box (or shrink smaller if needed)
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Opportunity image: fills top of card; alt text tied to opportunity name for accessibility. */}
            <Box sx={{ position: 'relative' }}>
                {/* Opportunity image: fills top of card; alt text tied to opportunity name for accessibility. */}
                <CardMedia
                    component="img"
                    image={selected.image}
                    alt={selected.opportunityName}
                    sx={{ width: '100%', height: 160, objectFit: 'cover' }} />
                {/* Status labels overlay: e.g. "Always Open" or "Qualified". */}
                <StatusLabels labels={selected.labels} />
                {/* Bottom-right corner: render small avatars for each available network in the group. */}
                <NetworkAvatars group={group} />
            </Box>

            {/* Main content area: includes header, selector, description, features list, and tags. */}
            <CardContent sx={{
                flexGrow: 1,
                padding: 0,
                margin: 0
            }}>
                {/* Header bar: shows the opportunity’s token icon, name, and issuer name in small-caps. */}
                <Box sx={{ display: 'flex', flexDirection: "column" }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: "#ebebeb", mb: 1, padding: 0, height: "70px" }}>
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
                    {/* Chain selector and Invest button */}
                    <ChainSelector children={children} selected={selected} setSelectedId={setSelectedId} />
                </Box>

                {/* Opportunity description: brief textual overview. */}
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 1, padding: 1 }}>
                    {selected.description}
                </Typography>

                {/* Feature list: displays key/value pairs with flip animation for emphasis. */}
                {selected.opportunityFeatures  && (
                    <FeatureList features={selected.opportunityFeatures} />
                )}

                {/* Category tags: rendered as outlined chips to convey additional attributes. */}
                <TagChips tags={selected.tags} />
            </CardContent>
        </Card>
    )
}
// End of OpportunityGroupCard component
