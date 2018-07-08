import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import { deepPurple500 as primaryColor, 
//         deepPurple300 as primaryColor2, 
//         deepPurple100 as primaryColor3, 
//         teal500 as accentColor1,
//         grey100, grey300, grey500, darkBlack, white, fullBlack } from 'material-ui/styles/colors';
import {teal700,
    grey400, grey600,
    pinkA100, pinkA200, pink700, pinkA400,
    fullWhite} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
//import spacing from 'material-ui/spacing';

import Redo from 'material-ui/svg-icons/content/redo';
import Undo from 'material-ui/svg-icons/content/undo';
import Edit from 'material-ui/svg-icons/image/edit';
import Add from 'material-ui/svg-icons/content/add-circle';
import Done from 'material-ui/svg-icons/action/done-all';
import Delete from 'material-ui/svg-icons/action/delete-forever';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionToday from 'material-ui/svg-icons/action/today';
import ActionPrint from 'material-ui/svg-icons/action/print';
import PersonPin from 'material-ui/svg-icons/maps/person-pin';
import DateRange from 'material-ui/svg-icons/action/date-range';
        

const muiTheme = getMuiTheme({
    appBar: {
        height: 50,
    },
    //spacing: spacing,
    fontFamily: 'Roboto, sans-serif',
    borderRadius: 2,
    palette: {
    //   primary1Color: primaryColor,
    //   primary2Color: primaryColor2,
    //   primary3Color: primaryColor3,
    //   accent1Color: accentColor1,
        primary1Color: teal700,
        primary2Color: teal700,
        primary3Color: grey600,
        accent1Color: pink700,
        accent2Color: pinkA200,
        accent3Color: pinkA100,
        textColor: fullWhite,
        secondaryTextColor: fullWhite,
        alternateTextColor: fullWhite,
        canvasColor: '#303030', // the background color
        borderColor: grey400,
        disabledColor: fade(fullWhite, 0.9),
        pickerHeaderColor: fullWhite,
        clockCircleColor: fade(fullWhite, 0.12),
    },
    prepareStyles: {
        
    }
});

const Icons = {
    Redo,
    Undo,
    Edit,
    Add,
    Done,
    Delete,
    FavoriteBorder,
    ActionFavorite,
    ActionToday,
    ActionPrint,
    PersonPin,
    DateRange
};

const Colors = {
    disabledColor: fade(fullWhite, 0.4) ,
    enabledColor: '#303030',
    // primaryColor,
    // primaryColor2,
    primaryColor3: teal700,
    accent1Color: pink700
    //accentColor1
};

export {
    muiTheme,
    Colors,
    Icons   
};