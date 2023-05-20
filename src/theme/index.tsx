import React, { useMemo } from 'react';
import { CssBaseline, DeprecatedThemeOptions } from '@mui/material';
import { ThemeProvider, Theme, createTheme, StyledEngineProvider, adaptV4Theme } from '@mui/material/styles';
import shape from '@/theme/shape';
import palette from '@/theme/palette';
import typography from '@/theme/typography';
import GlobalStyles from '@/theme/globalStyles';
import componentsOverride from '@/theme/overrides';
import shadows, { customShadows } from '@/theme/shadows';


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


interface Props {
    children;
}

export const ThemeConfig = (props: Props): JSX.Element => {
    const { children } = props;
    const themeOptions = useMemo<ThemeOptions>(
        () => ({
            palette,
            shape,
            // typography,
            // shadows,
            customShadows
        }),
        []
    );

    const theme = createTheme(adaptV4Theme(themeOptions));
    theme.components = componentsOverride(theme);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalStyles />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default ThemeConfig;
