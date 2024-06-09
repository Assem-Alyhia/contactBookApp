import React from 'react';
import { Container, Box, Typography, TextField, Button, Grid, IconButton, useMediaQuery } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import TagIcon from '@mui/icons-material/Tag';
import Footer from '@/components/Utility/Footer';
import Link from 'next/link';
import { useSendEmailMutation } from '@/pages/api/contacts/setSendEmail';
import { SnackbarProvider, useSnackbar } from 'notistack';

function SendEmailForm() {
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const sendEmailMutation = useSendEmailMutation();
    const { enqueueSnackbar } = useSnackbar();

    const handleSendEmail = () => {
        const emailData = {
            to: document.getElementById('to').value,
            cc: document.getElementById('cc').value,
            bcc: document.getElementById('bcc').value,
            subject: document.getElementById('subject').value,
            body: document.getElementById('message').value
        };

        sendEmailMutation.mutate(emailData, {
            onSuccess: () => {
                enqueueSnackbar('Email sent successfully!', { variant: 'success', autoHideDuration: 3000 });
            },
            onError: (error) => {
                enqueueSnackbar('Error sending email: ' + error.message, { variant: 'error', autoHideDuration: 3000 });
            }
        });
    };

    return (
        <Box sx={{ marginTop: '1rem' }}>
            <Container maxWidth="lg">
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Home / Contacts / Send email
                </Typography>
                <Box borderBottom={2} mb={2} sx={{ opacity: 0.2 }} />
                <Box display="flex" justifyContent="flex-end" mb={3} sx={{ paddingLeft: isMobile ? 0 : '24px', flexDirection: isMobile ? 'column' : 'row' }}>
                    <Link href='/contacts/contactsTable'>
                        <Button
                            variant="contained"
                            color="error"
                            sx={{
                                mr: isMobile ? 0 : 2,
                                mb: isMobile ? 2 : 0,
                                width: isMobile ? '100%' : '180px',
                                height: '2.5em',
                                py: '0px',
                                borderRadius: '4px',
                                textTransform: 'capitalize',
                                fontSize: '14px',
                            }}
                        >
                            Discard
                        </Button>
                    </Link>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            width: isMobile ? '100%' : '180px',
                            height: '2.5em',
                            py: '0px',
                            borderRadius: '4px',
                            textTransform: 'capitalize',
                            fontSize: '14px',
                        }}
                        onClick={handleSendEmail}
                    >
                        Send
                    </Button>
                </Box>
                <Box sx={{ backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0px 3px 15px #00000012' }}>
                    <Typography variant="h6" mb={3} sx={{ fontSize: '20px', fontWeight: '600', background: '#F7F7F7', padding: '.7rem', borderRadius: '5px', borderBottom: '1px solid #E0E0E0' }}>
                        User details
                    </Typography>
                    <Grid container spacing={2} sx={{ padding: '1rem 2rem' }}>
                        <Grid item xs={12} md={12} display="flex" flexDirection={isMobile ? 'column' : 'row'} alignItems={isMobile ? 'flex-start' : 'center'}>
                            <Typography variant="caption" display="block" sx={{ fontSize: '16px', fontWeight: '600', minWidth: '70px', textAlign: isMobile ? 'left' : 'right' }}>
                                To:
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                id="to"
                                placeholder="abc@xyz.com"
                                name="to"
                                autoComplete="email"
                                size="small"
                                InputLabelProps={{ shrink: false }}
                                sx={{ ml: isMobile ? 0 : 2, mt: isMobile ? 1 : 0, "& .MuiInputBase-root": { textAlign: 'left' }, border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} display="flex" flexDirection={isMobile ? 'column' : 'row'} alignItems={isMobile ? 'flex-start' : 'center'}>
                            <Typography variant="caption" display="block" sx={{ fontSize: '16px', fontWeight: '600', minWidth: '70px', textAlign: isMobile ? 'left' : 'right' }}>
                                CC:
                            </Typography>
                            <TextField
                                fullWidth
                                id="cc"
                                placeholder="abc@xyz.com"
                                name="cc"
                                autoComplete="email"
                                size="small"
                                InputLabelProps={{ shrink: false }}
                                sx={{ ml: isMobile ? 0 : 2, mt: isMobile ? 1 : 0, "& .MuiInputBase-root": { textAlign: 'left' }, border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} display="flex" flexDirection={isMobile ? 'column' : 'row'} alignItems={isMobile ? 'flex-start' : 'center'}>
                            <Typography variant="caption" display="block" sx={{ fontSize: '16px', fontWeight: '600', minWidth: '70px', textAlign: isMobile ? 'left' : 'right' }}>
                                BCC:
                            </Typography>
                            <TextField
                                fullWidth
                                id="bcc"
                                placeholder="abc@xyz.com"
                                name="bcc"
                                autoComplete="email"
                                size="small"
                                InputLabelProps={{ shrink: false }}
                                sx={{ ml: isMobile ? 0 : 2, mt: isMobile ? 1 : 0, "& .MuiInputBase-root": { textAlign: 'left' }, border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} display="flex" flexDirection={isMobile ? 'column' : 'row'} alignItems={isMobile ? 'flex-start' : 'center'}>
                            <Typography variant="caption" display="block" sx={{ fontSize: '16px', fontWeight: '600', minWidth: '70px', textAlign: isMobile ? 'left' : 'right' }}>
                                Subject:
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                id="subject"
                                placeholder="Subject"
                                name="subject"
                                autoComplete="subject"
                                size="small"
                                InputLabelProps={{ shrink: false }}
                                sx={{ ml: isMobile ? 0 : 2, mt: isMobile ? 1 : 0, "& .MuiInputBase-root": { textAlign: 'left' }, border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                            />
                        </Grid>
                        <Grid item xs={12} display="flex" flexDirection="column" alignItems="flex-start" sx={{ paddingLeft: isMobile ? '0' : '6rem !important', marginTop: '1rem' }}>
                            <Box display="flex" alignItems="center" mb={1} width="100%" sx={{ flexWrap: 'wrap' }}>
                                <IconButton size="small" sx={{ border: '1px solid #E0E0E0', borderRadius: '4px' }}>
                                    <FormatBoldIcon />
                                </IconButton>
                                <IconButton size="small" sx={{ border: '1px solid #E0E0E0', borderRadius: '4px' }}>
                                    <FormatItalicIcon />
                                </IconButton>
                                <IconButton size="small" sx={{ border: '1px solid #E0E0E0', borderRadius: '4px' }}>
                                    <FormatUnderlinedIcon />
                                </IconButton>
                                <IconButton size="small" sx={{ border: '1px solid #E0E0E0', borderRadius: '4px' }}>
                                    <FormatAlignLeftIcon />
                                </IconButton>
                                <IconButton size="small" sx={{ border: '1px solid #E0E0E0', borderRadius: '4px' }}>
                                    <FormatAlignCenterIcon />
                                </IconButton>
                                <IconButton size="small" sx={{ border: '1px solid #E0E0E0', borderRadius: '4px' }}>
                                    <FormatAlignRightIcon />
                                </IconButton>
                                <IconButton size="small" sx={{ border: '1px solid #E0E0E0', borderRadius: '4px' }}>
                                    <AttachFileIcon />
                                </IconButton>
                                <IconButton size="small" sx={{ border: '1px solid #E0E0E0', borderRadius: '4px' }}>
                                    <TagIcon />
                                </IconButton>
                            </Box>
                            <TextField
                                required
                                fullWidth
                                id="message"
                                placeholder="Message"
                                name="message"
                                autoComplete="message"
                                size="small"
                                multiline
                                rows={4}
                                InputLabelProps={{ shrink: false }}
                                sx={{ "& .MuiInputBase-root": { textAlign: 'left' }, border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Footer color='#000' gap='0 50% 0 10%' opacity='0.3' />
        </Box>
    );
}

export default function SendEmailPage() {
    return (
        <SnackbarProvider maxSnack={3}>
            <SendEmailForm />
        </SnackbarProvider>
    );
}
