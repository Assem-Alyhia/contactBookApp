import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useProfileQuery } from '@/pages/api/users/getProfile';
import { logoutUser } from '@/pages/api/users/logout';
import logoW from '../../public/images/logoW.svg';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import getPermissions from './rolesPermissions';

const pages = [
    { name: 'Home', link: '/dashboard', permission: 'canViewHome' },
    { name: 'Contacts', link: '/contacts/contactsTable', permission: 'canManageContacts' },
    { name: 'Company Profile', link: '/company', permission: 'canViewCompany' },
    { name: 'Users', link: '/users/usersTable', permission: 'canManageUsers' }
];

const settings = [
    { name: 'My Profile', link: '/users/editUser' },
    { name: 'Log Out', action: logoutUser }
];

function Navbar() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const router = useRouter();
    const { data: userProfile, isLoading } = useProfileQuery(); // جلب بيانات المستخدم

    if (isLoading) {
        return null; // عرض مؤقت أو عنصر تحميل
    }

    const role = userProfile?.role || 'Owner'; // افتراض الدور owner إذا لم يتم تعيين دور
    const permissions = getPermissions(role);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMyProfileClick = () => {
        if (userProfile) {
            router.push({
                pathname: '/users/editUser',
                query: { ...userProfile } // تمرير بيانات المستخدم كـ query parameters
            });
        }
    };

    const handleLogout = () => {
        logoutUser();
        handleCloseUserMenu();
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const drawerList = () => (
        <Box
            sx={{ width: '80vw' }} // زيادة عرض القائمة الجانبية
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#007bff', color: 'white', p: 2 }}>
                <Image src={logoW} alt="Contact Book Logo" width={160} height={34} />
                <IconButton onClick={toggleDrawer(false)} sx={{ color: 'white' }}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <List>
                {pages.map((page) => (
                    permissions[page.permission] && (
                        <Link href={page.link} passHref legacyBehavior key={page.name}>
                            <MenuItem sx={{ borderBottom: '1px solid #ddd', py: 2 }}>
                                <Typography textAlign="center" sx={{ color: 'black', fontSize: '16px', textDecoration: 'none' ,fontWeight:'500',}}>
                                    {page.name}
                                </Typography>
                            </MenuItem>
                        </Link>
                    )
                ))}

                <MenuItem sx={{ borderBottom: '1px solid #ddd', py: 2 ,fontWeight:'500'}}>
                    <AccountCircleIcon sx={{ mr: 1 }} />
                    {userProfile?.username || 'Username'}
                </MenuItem>
                {settings.map((setting) => (
                    setting.name === 'My Profile' ? (
                        <MenuItem key={setting.name} onClick={handleMyProfileClick} sx={{ borderBottom: '1px solid #ddd', py: 2 }}>
                            <Typography textAlign="center" sx={{ pl: 3, color: 'black', fontSize: '16px', textDecoration: 'none' ,fontWeight:'500'}}>
                                {setting.name}
                            </Typography>
                        </MenuItem>
                    ) : (
                        <MenuItem key={setting.name} onClick={setting.action ? handleLogout : handleCloseUserMenu} sx={{ borderBottom: '1px solid #ddd', py: 2 }}>
                            <Typography textAlign="center" sx={{ pl: 3, color: 'black', fontSize: '16px', textDecoration: 'none' ,fontWeight:'500'}}>
                                {setting.name}
                            </Typography>
                        </MenuItem>
                    )
                ))}
            </List>
        </Box>
    );

    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', mr: 2 }}>
                        <IconButton
                            size="large"
                            aria-label="open drawer"
                            onClick={toggleDrawer(true)}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }, justifyContent: { xs: 'center', md: 'flex-start' }, alignItems: 'center' , width:'8rem',    flexGrow: '.5'}}>
                        <Link href='/dashboard'>
                            <Image src={logoW} alt="Contact Book Logo" width={160} height={34} />
                        </Link>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            permissions[page.permission] && (
                                <Link href={page.link} passHref legacyBehavior key={page.name}>
                                    <Button
                                        onClick={toggleDrawer(false)}
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
                            )
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="User Avatar" src={userProfile?.avatar || '/images/default-avatar.jpg'} sx={{ mr: 1 }} />
                                <Typography
                                    variant="body1"
                                    color="inherit"
                                    sx={{ my: 2, color: 'white', display: { xs: 'none', md: 'block' }, fontSize: 16 }}
                                >
                                    {userProfile?.username || 'User name'}
                                </Typography>
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
                                setting.name === 'My Profile' ? (
                                    <MenuItem key={setting.name} onClick={handleMyProfileClick}>
                                        <Typography textAlign="center" sx={{ textDecoration: 'none' }}>
                                            {setting.name}
                                        </Typography>
                                    </MenuItem>
                                ) : (
                                    <MenuItem key={setting.name} onClick={setting.action ? handleLogout : handleCloseUserMenu}>
                                        <Typography textAlign="center" sx={{ textDecoration: 'none' }}>
                                            {setting.name}
                                        </Typography>
                                    </MenuItem>
                                )
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                {drawerList()}
            </Drawer>
        </AppBar>
    );
}

export default Navbar;
