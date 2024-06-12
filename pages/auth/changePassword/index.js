import * as React from 'react';
import { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Grid } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Footer from '@/components/Utility/Footer';
import Image from 'next/image';
import logoW from '../../../public/images/logo.svg';
import img from '../../../public/images/1.jpg';
import { useSendResetCodeMutation } from '@/pages/api/sendResetCode/sendResetCode';

export default function ChangePassword() {
    const [email, setEmail] = useState('');
    const router = useRouter();
    const { mutate, isLoading, isError } = useSendResetCodeMutation();

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate({ email }, {
            onSuccess: (data) => {
                const { id, code } = data; // افترض أن البيانات المسترجعة تحتوي على id و code
                router.push(`/auth/resetPassword?id=${id}&code=${code}`);
            },
            onError: (error) => {
                console.error('Error sending reset code: ', error);
            }
        });
    };

    return (
        <Box>
            <Container component="main" maxWidth='xl' sx={{ display: 'flex', height: {xs:'90vh',md:'100vh'}, justifyContent: 'space-between', padding: '0 !important'}}>
                <Grid container sx={{ flexGrow: 1, padding: 0 }}>
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            position: 'relative',
                            flexBasis: '60%',
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
                    <Grid item xs={12} sm={8} md={4} component={Box} sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'start' }, justifyContent: 'center', padding: { xs: '2rem', md: '5rem 2rem 5rem 6rem' }, margin: 'auto' }}>
                        <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 1 }}>
                            <Image src={logoW} alt="Contact Book Logo" width={100} height={100} />
                        </Box>
                        <Typography component="h1" variant="h5" sx={{ display: { xs: 'none', md: 'block' }, fontWeight: 'bold', fontSize: '30px', mb: 3 }}>
                            Change Password
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1, width: '100%' }} onSubmit={handleSubmit}>
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
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, height: '2.5em', py: '0px', borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px' }}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Sending...' : 'Send'}
                            </Button>
                            {isError && <div>Error sending reset code. Please try again.</div>}
                            <Grid container justifyContent="flex-end">
                                <Grid item sx={{ margin: 'auto' }}>
                                    <Link href="/auth/signIn" variant="body2">
                                        {"Back to login"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Footer color='#fff' gap='0 15% 0 10%' marginTop='0%'/>
        </Box>
    );
}
