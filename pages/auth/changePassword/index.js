import * as React from 'react';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Link,
} from '@mui/material';
import Footer from '@/components/Utility/Footer';
import Image from 'next/image';
import logoW from '../../../public/images/logo.svg';
import img from '../../../public/images/1.jpg';

export default function ChangePassword() {
    return (
        <Box>
            <Container component="main" maxWidth='xl' sx={{ display: 'flex', height: '100vh', justifyContent: 'space-between', padding: '0 !important' }}>
                <Grid container sx={{ flexGrow: 1, padding: 0 }}>
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={8}
                        sx={{
                            position: 'relative',
                            display: { xs: 'none', md: 'block' },
                        }}
                    >
                        <Image
                            src={img}
                            alt="Background Image"
                            layout="fill"
                            objectFit="cover"
                            quality={100}
                            style={{
                                backgroundColor: (t) =>
                                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={4} component={Box} sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'start' }, justifyContent: 'center', padding: { xs: '2rem', md: '0  7rem' } }}>
                        <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 3 }}>
                            <Image src={logoW} alt="Contact Book Logo" width={100} height={100} />
                        </Box>
                        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', fontSize: '30px', display: { xs: 'none', md: 'block' } }}>
                            Change Password
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Enter your email address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                size={'small'}
                                sx={{ "& input": { border: 'solid 1px #E0E0E0', borderRadius: '5px' } }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, height: '2.5em', py: '0px', borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px' }}
                            >
                                Send
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item sx={{ margin: 'auto' }}>
                                    <Link href="#" variant="body2">
                                        {"Back to login"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                <Footer color='#fff' gap='0 15% 0 10%' />
            </Container>
        </Box>
    );
}
