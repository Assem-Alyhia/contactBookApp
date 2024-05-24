import React from 'react';
import { Container, Box, Typography, TextField, Button, Grid, IconButton } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import TagIcon from '@mui/icons-material/Tag';
import Footer from '@/components/Utility/Footer';
export default function SendEmail() {
    return (
        <Box sx={{ marginTop: '1rem' }}>
            <Container maxWidth="lg">
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Home / Contacts / Send email
                </Typography>
                <Box borderBottom={2} mb={2} sx={{ opacity: 0.2 }} />
                <Box display="flex" justifyContent="flex-end" mb={3} sx={{ paddingLeft: '24px' }}>
                    <Button variant="contained" color="error"
                        sx={{ mr: 2, width: '180px', height: '2.5em', py: '0px', borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px' }}
                    >
                        Discard
                    </Button>
                    <Button variant="contained" color="primary"
                        sx={{ mr: 2, width: '180px', height: '2.5em', py: '0px', borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px' }}
                    >
                        Send
                    </Button>
                </Box>  
                <Box sx={{ backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0px 3px 15px #00000012' }}>
                    <Typography variant="h6" mb={3} sx={{ fontSize: '20px', fontWeight: '600', background: '#F7F7F7', padding: '.7rem', borderRadius: '5px', borderBottom: '1px solid #E0E0E0' }}>
                        User details
                    </Typography>
                    <Grid container spacing={2} sx={{ padding: '1rem 2rem' }}>
                        <Grid item xs={12} md={12} display="flex" alignItems="center">
                            <Typography variant="caption" display="block" sx={{ fontSize: '16px', fontWeight: '600', minWidth: '70px', textAlign: 'right' }}>
                                To:
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                id="to"
                                placeholder="abc@xyz.com"
                                name="to"
                                autoComplete="email"
                                size={'small'}
                                InputLabelProps={{ shrink: false }}
                                sx={{ ml: 2, "& .MuiInputBase-root": { textAlign: 'left' }, border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} display="flex" alignItems="center">
                            <Typography variant="caption" display="block" sx={{ fontSize: '16px', fontWeight: '600', minWidth: '70px', textAlign: 'right' }}>
                                CC:
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                id="cc"
                                placeholder="abc@xyz.com"
                                name="cc"
                                autoComplete="email"
                                size={'small'}
                                InputLabelProps={{ shrink: false }}
                                sx={{ ml: 2, "& .MuiInputBase-root": { textAlign: 'left' }, border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} display="flex" alignItems="center">
                            <Typography variant="caption" display="block" sx={{ fontSize: '16px', fontWeight: '600', minWidth: '70px', textAlign: 'right' }}>
                                BCC:
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                id="bcc"
                                placeholder="abc@xyz.com"
                                name="bcc"
                                autoComplete="email"
                                size={'small'}
                                InputLabelProps={{ shrink: false }}
                                sx={{ ml: 2, "& .MuiInputBase-root": { textAlign: 'left' }, border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} display="flex" alignItems="center">
                            <Typography variant="caption" display="block" sx={{ fontSize: '16px', fontWeight: '600', minWidth: '70px', textAlign: 'right' }}>
                                Subject:
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                id="subject"
                                placeholder="abc@xyz.com"
                                name="subject"
                                autoComplete="subject"
                                size={'small'}
                                InputLabelProps={{ shrink: false }}
                                sx={{ ml: 2, "& .MuiInputBase-root": { textAlign: 'left' }, border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                            />
                        </Grid>
                        <Grid item xs={12} display="flex" flexDirection="column" alignItems="flex-start"  sx={{paddingLeft: '6rem !important' , marginTop:' 1rem'}}>
                            <Box display="flex" alignItems="center" mb={1} width="100%" sx={{flexWrap:'Wrap' }}>
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
                                size={'small'}
                                multiline
                                rows={4}
                                InputLabelProps={{ shrink: false }}
                                sx={{ "& .MuiInputBase-root": { textAlign: 'left' }, border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Footer  color = '#000' gap = '0 50% 0 10%' opacity='0.3' />
        </Box>
    );
}
