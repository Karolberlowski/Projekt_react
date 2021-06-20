import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { initialMems } from './data';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    origin: "center",
    backgroundColor: theme.palette.background.paper,
    position: "top: 200px",
  },

  gridList: {
    width: 500,
    height: 800,
  },
  icon: {
    color: 'rgba(255, 255, 100, 0.54)',
  },
}));


// general function
const Mem = () => {
  const classes = useStyles();
  const [mems, setMems] = React.useState(initialMems);

//mems to filter
  function getMem() {
    const memList = mems;
    return memList;
  }

  //select hot mem
  function filterHotMem() {
    let filtredMem = getMem().filter((type) => type.upvote - type.downvote > 5);
    return filtredMem;
  }

  //select regular mem
  function filterRegMem() {
    let filtredMem = getMem().filter(
      (type) => type.upvote - type.downvote <= 5
    );
    return filtredMem;
  }

  // content mem
  const [filtredMem, setFiltredMem] = React.useState();
  useEffect(() => {
    setFiltredMem(getMem());
  }, []);

  //select hot mem button
  function handleHotMem(e) {
    let typeMem = e.target.value;
    typeMem !== 'all'
      ? setFiltredMem(filterHotMem(typeMem))
      : setFiltredMem(getMem());
  }

  //select regular mem button
  function handleRegMem(e) {
    let typeMem = e.target.value;
    typeMem !== 'all'
      ? setFiltredMem(filterRegMem(typeMem))
      : setFiltredMem(getMem());
  }

  //incremence vote mem
  function handleToggleup(id) {
    const newMems = mems.map((item) => {
      if (item.id === id) {
        const updateItem = {
          ...item,
          upvote: item.upvote + 1,
        };
        return updateItem;
      }
      return item;
    });
    setMems(newMems);
  }

  //decremence vote mem
  function handleToggledown(id) {
    const newMems = mems.map((item) => {
      if (item.id === id) {
        const updateItem = {
          ...item,
          downvote: item.downvote + 1,
        };
        return updateItem;
      }
      return item;
    });
    setMems(newMems);
  }

  return (
    <div className={classes.root} >
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <Button
              variant="contained"
              color="inherit"
              {...bindTrigger(popupState)}
            >
              Filter
            </Button>
            <Menu {...bindMenu(popupState)}>
              <MenuItem onClick={handleHotMem}>HOT</MenuItem>
              <MenuItem onClick={handleRegMem}>REGULAR</MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>

      <div className="grid">
        <GridList cellHeight={500} className={classes.gridList} cols={1}>
          {filtredMem &&
            filtredMem.map((List, index) => (
              <GridListTile key={List.id}>
                <img src={List.img} />
                <GridListTileBar
                  actionIcon={
                    <ButtonGroup
                      variant="contained"
                      disableRipple="true"
                      color="primary"
                    >
                      <Button onClick={() => handleToggleup(List.id)}>
                        {' '}
                        hot +{' '}
                      </Button>
                      <Button onClick={() => handleToggledown(List.id)}>
                        {' '}
                        regular +{' '}
                      </Button>
                    </ButtonGroup>
                  }
                />
              </GridListTile>
            ))}
        </GridList>
      </div>
    </div>
  );
};

export default Mem;

