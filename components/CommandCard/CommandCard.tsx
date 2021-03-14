import { Card, Typography, Box, Link, Grid, CardActionArea } from "@material-ui/core"
import Command from "./types"

export default function CommandCard({
  title,
  description,
  icon,
  authors,
  language,
  isTemplate,
  hasArguments,
}: Command): JSX.Element {
  // Source: https://stackoverflow.com/a/20292655/7897036
  const capitalize = (string = "") => [...string].map((char, index) => (index ? char : char.toUpperCase())).join("")

  const iconElement = () => {
    if (icon === null) {
      return <Typography fontSize="20px">👋</Typography>
    }

    let emojiIcon = icon.dark || icon.light
    if (emojiIcon.includes("images")) {
      emojiIcon = "👋"
    }

    return <Typography fontSize="20px">{emojiIcon}</Typography>
  }

  const authorElements = authors?.map((author, index) => (
    <Link key={author.name} href={author.url} target="_blank" rel="noopener noreferrer" variant="body1" color="inherit">
      {index === 0 ? "By " : " and "}
      {author.name}
    </Link>
  ))

  return (
    <Grid item xs={6}>
      <Card sx={{ height: "100%" }}>
        <CardActionArea
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Box display="flex" alignItems="baseline">
              {iconElement()}
              <Typography variant="h6" fontWeight="bold" paddingLeft="8px">
                {title}
              </Typography>
            </Box>

            <Typography paddingTop="4px">{description || "N/A"}</Typography>
          </Box>

          <Box>
            <Typography height="100%" color="textSecondary">
              {isTemplate ? "Template • " : ""}
              {hasArguments ? "Arguments • " : ""}
              {capitalize(language)}
              {" • "}
              {authorElements}
            </Typography>
          </Box>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

/* <img
  src="https://raw.githubusercontent.com/raycast/script-commands/master/commands/dashboard/images/speedtest-logo.png"
  alt="test"
  height={32}
  width={32}
/> */
