import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Link from 'next/link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from 'next/image';
import logoW from '../../public/images/logoW.svg'; // assuming the logo is in this path

const pages = [
    { name: 'Home', link: '/dashboard' },
    { name: 'Contacts', link: '/contacts/contactsTable' },
    { name: 'Company Profile', link: '/companyprofile' },
    { name: 'Users', link: '/users/usersTable' }
];

const settings = [
    { name: 'My Profile', link: '/users/editUser' },
    { name: 'Log Out', link: '/auth/signIn' }
];

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mr: 7 }}>
                        <Link href='/'>
                            <Image src={logoW} alt="Contact Book Logo" width={160} height={34} />
                        </Link>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'center' }}>
                        <Image src={logoW} alt="Contact Book Logo" width={160} height={34} />
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                                '& .MuiPaper-root': {
                                    width: '100%', // Increase width to fill the screen
                                },
                            }}
                        >
                            <Box sx={{ backgroundColor: '#007bff', color: 'white', p: 2, textAlign: 'start' }}>
                                <Image src={logoW} alt="Contact Book Logo" style={{ width: '100%' }} />
                                <Typography variant="h6" sx={{ fontWeight: 'bold', display: { xs: 'none', md: 'none' } }}>CONTACT BOOK</Typography>
                            </Box>
                            {pages.map((page) => (
                                <Link href={page.link} passHref legacyBehavior key={page.name} >
                                    <MenuItem onClick={handleCloseNavMenu} sx={{ borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', py: 1 }}>
                                        <Typography textAlign="center" sx={{ color: 'black', fontSize: '16px', textDecoration: 'none' }}>
                                            {page.name}
                                        </Typography>
                                    </MenuItem>
                                </Link>
                            ))}
                            <MenuItem key="username" onClick={handleCloseNavMenu} sx={{ borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', py: 1 }}>
                                <AccountCircleIcon sx={{ mr: 1 }} />
                                Username
                            </MenuItem>
                            {settings.map((setting) => (
                                <Link href={setting.link} passHref legacyBehavior key={setting.name}>
                                    <MenuItem onClick={handleCloseUserMenu} sx={{ borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', py: 1 }}>
                                        <Typography textAlign="center" sx={{ pl: 3, color: 'black', fontSize: '16px', textDecoration: 'none' }}>
                                            {setting.name}
                                        </Typography>
                                    </MenuItem>
                                </Link>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Link href={page.link} passHref legacyBehavior key={page.name}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        mr: 4,
                                        my: 2,
                                        color: 'white',
                                        textTransform: 'capitalize',
                                        display: 'block',
                                        opacity: 0.7,
                                        fontSize: '12px',
                                        textDecoration: 'none', 
                                        '&:hover': {
                                            opacity: 1,
                                            textDecoration: 'none'
                                        },
                                    }}
                                >
                                    {page.name}
                                </Button>
                            </Link>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                                    <Avatar alt="Remy Sharp" src="/images/1.jpg" sx={{ mr: 1 }} />
                                    <Typography
                                        variant="body1"
                                        color="inherit"
                                        sx={{ my: 2, color: 'white', display: 'block', fontSize: 16 }}
                                    >
                                        User name
                                    </Typography>
                                </Box>
                                <Box sx={{ display: { md: 'none', xs: 'none' }, alignItems: 'center' }}>
                                    <Avatar alt="Remy Sharp" src="/images/1.jpg" sx={{ mr: 1 }} />
                                    <Typography
                                        variant="body1"
                                        color="inherit"
                                        sx={{ my: 2, color: 'white', display: 'block', fontSize: 16 }}
                                    >
                                        User name
                                    </Typography>
                                </Box>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <Link href={setting.link} passHref legacyBehavior key={setting.name}>
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center" sx={{ textDecoration: 'none' }}>
                                            {setting.name}
                                        </Typography>
                                    </MenuItem>
                                </Link>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;
