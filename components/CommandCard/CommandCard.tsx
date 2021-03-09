import { Card, Typography, Box, CardContent, Link, Grid } from "@material-ui/core"
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

  return (
    <Grid item sx={{ minWidth: "420px", maxWidth: "420px" }}>
      <Card>
        <CardContent>
          <Box display="flex" alignItems="top">
            <img
              src="https://raw.githubusercontent.com/raycast/script-commands/master/commands/dashboard/images/speedtest-logo.png"
              alt="test"
              height={32}
              width={32}
            />
            <Typography variant="h6" fontWeight="bold" paddingLeft="8px">
              {title}
            </Typography>
          </Box>

          <Typography paddingTop="8px">{description || "N/A"}</Typography>
          <Box>
            <Typography color="textSecondary">
              {isTemplate ? "Template • " : ""}
              {hasArguments ? "Arguments • " : ""}
              {capitalize(language)}
              {" • "}
              <Link
                href="https://github.com/raycast/script-commands/tree/master/commands#slack"
                target="_blank"
                rel="noopener noreferrer"
                variant="body1"
                color="inherit"
              >
                By Alexandru Turcanu
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )
}
