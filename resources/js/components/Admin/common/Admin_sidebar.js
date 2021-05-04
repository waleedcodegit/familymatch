import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
//import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
//import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import {withRouter} from 'react-router';
import {Route} from 'react-router-dom';
import Axios from 'axios'
import '../css/admin.css'
import {Link} from 'react-router-dom';

// Importing Components
import Dash from '../common/Dashboard';
import Adduser from './AddUser'
import AllUsers from './ShowUsers'
import EditUser from './EditUser'
import Categories from './categories'
import Posts from './NewPosts'
import Allposts from './AllPosts';
import EditPosts from './EditPost';
import NewPlan from './NewPlan'
import ShowPlans from './ShowPlans'
import EditPlan from './EditPlan'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({ 
  Dividers:{
    backgroundColor:'#cecece',
    height:'1px'
  },
  Expanders:{
    color:'#adadad',
    //107595
  },
  ListItemstyles:{
   
    color:'#383636',
    fontSize:'15px',
    fontWeight:'bold',
    fontFamily:'calibri'
  },

    sidebarheads:{

        fontFamily:'sans-serif',
        fontWeight:'bolder',
        
        
        
    }, 
    sidebarchilds:{
      
        fontFamily:'calibri',
        fontWeight:'bold',
        color:'#383636',
        fontSize:'15px',
        marginLeft:'10px',
      
    }
    
    ,

  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% )`,
      marginLeft: drawerWidth,
      backgroundColor:'#25B9E9',
      height:'50px',
      borderBottom:'1px solid #3282b8'
    }
        },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    marginTop:'50px',
  backgroundColor:'#ffffff',

},
  
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop:'2%'
  },
}));

function Sidebar(props) {
  const [display, setdisplay] = React.useState(false);
  const senderdata = {
    token:window.localStorage.getItem('key2')
  }
  Axios.post('/api/admin_check_auth',senderdata).then(res=>{
    if(res.data != 0){
      setdisplay(true);
    }else{
      props.history.push('/adminlogin');
    }
    
  })
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [show1, setShow1] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  const [show3, setShow3] = React.useState(false);
  const [show4, setShow4] = React.useState(false);
  const [show5, setShow5] = React.useState(false);
  const [show6, setShow6] = React.useState(false);
  const [show7, setShow7] = React.useState(false);
  const [show8, setShow8] = React.useState(false);
  const [show9, setShow9] = React.useState(false);
  const [url, seturl] = React.useState('/images/dc-logo.png');
  
  const sidebarchildhandler = (par)=>{
    switch(par){
      case 1 :
        setShow1(!show1);setShow2(false);setShow3(false);setShow4(false);setShow5(false);
        setShow6(false);setShow7(false);setShow8(false);setShow9(false);
        break;
      case 2 :
        setShow1(false);setShow2(!show2);setShow3(false);setShow4(false);setShow5(false);
        setShow6(false);setShow7(false);setShow8(false);setShow9(false);
        break;
      case 3 :
        setShow1(false);setShow2(false);setShow3(!show3);setShow4(false);setShow5(false);
        setShow6(false);setShow7(false);setShow8(false);setShow9(false);
        break;
      case 4 :
        setShow1(false);setShow2(false);setShow3(false);setShow4(!show4);setShow5(false);
        setShow6(false);setShow7(false);setShow8(false);setShow9(false);
        break;
      case 5 :
        setShow1(false);setShow2(false);setShow3(false);setShow4(false);setShow5(!show5);
        setShow6(false);setShow7(false);setShow8(false);setShow9(false);
        break;
      case 6 :
        setShow1(false);setShow2(false);setShow3(false);setShow4(false);setShow5(false);
        setShow6(!show6);setShow7(false);setShow8(false);setShow9(false);
        break;
      case 7 :
        setShow1(false);setShow2(false);setShow3(false);setShow4(false);setShow5(false);
        setShow6(false);setShow7(!show7);setShow8(false);setShow9(false);
        break;
      case 8 :
        setShow1(false);setShow2(false);setShow3(false);setShow4(false);setShow5(false);
        setShow6(false);setShow7(false);setShow8(!show8);setShow9(false);
        break;
      case 9 :
        setShow1(false);setShow2(false);setShow3(false);setShow4(false);setShow5(false);
        setShow6(false);setShow7(false);setShow8(false);setShow9(!show9);
        break;      
    }
  }
  const drawer = (
    <div>
        
      
     
      <List className={classes.sidebarheads}>
      <ListItem  button component={Link} to="/adminpanel/dashboard">
       
          <ListItemText > 
           <h6 className={classes.ListItemstyles}><i className="fas fa-home"></i> Dashboard</h6>
          </ListItemText>
        </ListItem>
       
   
    <Divider className={classes.Dividers} />
  
    
          <ListItem button onClick={()=>  sidebarchildhandler(2)}  >
         
            <ListItemText>
            <h6 className={classes.ListItemstyles}> 
            <i className="fas fa-users"></i>  Manage Users</h6></ListItemText>
            { show2 ?
              <ExpandLess className={classes.Expanders}/> :
              <ExpandMore className={classes.Expanders}/>
            }


          </ListItem>
        {show2 ?
               <div className={classes.sidebarchilds}>
                  
                  
               <ListItem button component={Link} to="/adminpanel/NewUser" >
               <ListItemText ><h6 className={classes.sidebarchilds}>New User</h6></ListItemText>
               </ListItem>
             
               
               <ListItem button component={Link} to="/adminpanel/AllUsers">
               <ListItemText ><h6 className={classes.sidebarchilds}>All Users</h6></ListItemText>
               </ListItem>
               
               </div>:
           '' 
            }
     
      <Divider className={classes.Dividers} />
    
        
        <ListItem button  component={Link} to="/adminpanel/Categories"  >
        
          <ListItemText >
          <h6 className={classes.ListItemstyles}><i className="fas fa-sms"></i> Manage Categories </h6></ListItemText>
          {/* { show3 ? 
            <ExpandLess className={classes.Expanders}/> :
            <ExpandMore className={classes.Expanders}/>
          } */}


        </ListItem>
      
     <Divider className={classes.Dividers} />
  
        
          <ListItem button onClick={()=>  sidebarchildhandler(4)}   >
            
            <ListItemText > <h6 className={classes.ListItemstyles}><i className="fas fa-school"></i>  Manage Posts</h6></ListItemText>
            { show4 ? 
              <ExpandLess className={classes.Expanders}/> :
              <ExpandMore className={classes.Expanders}/>
            }


          </ListItem>
        {show4 ?
               <List 
               
               >
              <ListItem button component={Link} to="/adminpanel/NewPost">
               <ListItemText ><h6 className={classes.sidebarchilds}>New Post</h6></ListItemText>
               </ListItem>  
               <ListItem button component={Link} to="/adminpanel/AllPosts">
               <ListItemText ><h6 className={classes.sidebarchilds}>All Posts</h6></ListItemText>
               </ListItem>
               
           </List> :
           '' 
            } 

           <Divider className={classes.Dividers} />

     <ListItem button onClick={()=>  sidebarchildhandler(6)}  >
            
            <ListItemText > <h6 className={classes.ListItemstyles}><i className="fas fa-school"></i>  Manage Plans</h6></ListItemText>
            { show6 ? 
              <ExpandLess className={classes.Expanders}/> :
              <ExpandMore className={classes.Expanders}/>
            }


          </ListItem>
        {show6 ?
               <List 
               
               >
              <ListItem button component={Link} to="/adminpanel/NewPlan">
               <ListItemText ><h6 className={classes.sidebarchilds}>New Plan</h6></ListItemText>
               </ListItem>  
               <ListItem button component={Link} to="/adminpanel/AllPlans">
               <ListItemText ><h6 className={classes.sidebarchilds}>All Plans</h6></ListItemText>
               </ListItem>
               
           </List> :
           '' 
            }  
      <Divider className={classes.Dividers} />
     
        
          <ListItem button onClick={()=>  sidebarchildhandler(8)}  >
        
            <ListItemText >
            <h6 className={classes.ListItemstyles}> <i className="fas fa-cog"></i> Settings </h6></ListItemText>
            { show8 ? 
              <ExpandLess className={classes.Expanders}/> :
              <ExpandMore className={classes.Expanders}/>
            }


          </ListItem>
        {show8 ?
               <List 
               
               >
               <ListItem button>
               <ListItemText ><h6 className={classes.sidebarchilds}>Dropdown</h6></ListItemText>
               </ListItem>
           </List> :
           '' 
            }
      </List>
    </div>
  );

  return (
    <div id="adminsidebar" style={{position:'absolute',top:'0',left:'0',right:'0',bottom:'0',backgroundColor:'white'}}>
      {
        display?
        <div  className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton >
          <Typography  variant="h6" noWrap>
                    <div>
                    <h2 style={{color:'#ffffff',fontWeight:'normal',fontFamily:'Helvetica',fontSize:'20px',marginLeft:'0px'}} >Family Match</h2>

                    </div>
          </Typography>
        </Toolbar>
      </AppBar>
      <nav  className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <Route  path="/adminpanel/dashboard" component={Dash}  type="public"></Route>
        <Route  path="/adminpanel/NewUser" component={Adduser}  type="public"></Route>
        <Route  path="/adminpanel/AllUsers" component={AllUsers}  type="public"></Route>
        <Route  path="/adminpanel/EditUser/:id" component={EditUser}  type="public"></Route>
        <Route  path="/adminpanel/Categories" component={Categories}  type="public"></Route>
        <Route  path="/adminpanel/NewPost" component={Posts}  type="public"></Route>
        <Route  path="/adminpanel/AllPosts" component={Allposts}  type="public"></Route>
        <Route  path="/adminpanel/EditPost/:id" component={EditPosts}  type="public"></Route>
        <Route  path="/adminpanel/NewPlan" component={NewPlan}  type="public"></Route>
        <Route  path="/adminpanel/AllPlans" component={ShowPlans}  type="public"></Route>
        <Route  path="/adminpanel/EditPlan/:id" component={EditPlan}  type="public"></Route>

        </main>
    </div>
    :
    <div id="displayspinner" style={{display:'block',marginLeft:'45%',marginTop:'20%'}}>
        <div className="spinner-border text-info ml-2" style={{width:'100px',height:'100px'}} role="status">
            <span className="sr-only">Loading...</span>
        </div> 
    </div>

      }
    
    </div>
  );
}


export default Sidebar;
