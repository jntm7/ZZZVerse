import * as React from 'react';
import Head from 'next/head';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import AppBar from '../components/AppBar';

export default function Home() {
    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100&display=swap" rel="stylesheet" />
            </Head>
            <div>
                <main>
                    <Container>
                        <Box>
                            <AppBar />
                        </Box>
                        <Box 
                            sx={{ mt: 4 }}>
                            <Typography variant="h3" component="h3" color="secondary">Hello World!</Typography>
                        </Box>

                    </Container>
                </main>
            </div>
        </>
    )
}