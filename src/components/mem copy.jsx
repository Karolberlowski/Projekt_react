import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { initialMems } from './data';
import { getMem, filterHotMem, filterRegMem } from './functions';
import { buttonsM } from './menu';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 600,
  },
  icon: {
    color: 'rgba(255, 255, 100, 0.54)',
  },
}));

const Mem = () => {
  const classes = useStyles();

  const [filtredMem, setFiltredMem] = React.useState();
  useEffect(() => {
    setFiltredMem(getMem());
  }, []);

  //const [mems, setMems] = (initialMems);

  function handleHotMem(e) {
    let typeMem = e.target.value;
    typeMem !== 'all'
      ? setFiltredMem(filterHotMem(typeMem))
      : setFiltredMem(getMem());
  }

  function handleRegMem(e) {
    let typeMem = e.target.value;
    typeMem !== 'all'
      ? setFiltredMem(filterRegMem(typeMem))
      : setFiltredMem(getMem());
  }

  function handleToggleup(id) {
    const newMems = filtredMem.map((item) => {
      if (item.id === id) {
        const updateItem = {
          ...item,
          upvote: item.upvote + 1,
        };
        return updateItem;
      }
      return item;
    });
    setFiltredMem(newMems);
  }

  function handleToggledown(id) {
    const newMems = filtredMem.map((item) => {
      if (item.id === id) {
        const updateItem = {
          ...item,
          downvote: item.downvote + 1,
        };
        return updateItem;
      }
      return item;
    });
    setFiltredMem(newMems);
  }

  return (
    <div className={classes.root}>
      <>
        <button onClick={handleHotMem}>Hot</button>
        <button onClick={handleRegMem}>regular</button>
      </>
      <GridList cellHeight={500} className={classes.gridList} cols={1}>
        {filtredMem &&
          filtredMem.map((List, index) => (
            <GridListTile key={List.id}>
              <img src={List.img} />
              <GridListTileBar
                actionIcon={
                  <ButtonGroup
                    disableElevation
                    variant="contained"
                    color="primary"
                  >
                    <Button onClick={() => handleToggleup(List.id)}>
                      {' '}
                      hot {List.upvote}
                    </Button>
                    <Button onClick={() => handleToggledown(List.id)}>
                      {' '}
                      regular {List.downvote}
                    </Button>
                  </ButtonGroup>
                }
              />
            </GridListTile>
          ))}
      </GridList>
      ))}
    </div>
  );
};

export default Mem;

/*
    <GridList cellHeight={500} className={classes.gridList} cols={1}>
      
      {filtredMem &&
        filtredMem.map((List,index) => (
        <GridListTile key={List.id}>
          <img src={List.img}  />
                    <GridListTileBar
            
              actionIcon={
              <ButtonGroup disableElevation variant="contained" color="primary">
              <Button onClick={() => handleToggleup(List.id)}> hot {List.upvote}</Button>
              <Button onClick={() => handleToggledown(List.id)}> regular {List.downvote}</Button>
              <button onClick={() => alert("Hello!")}>Say Hello</button> 
            
                           
            </ButtonGroup>
                          }
                                     
                        
          />
         
        </GridListTile>
         ))
                         }
                          </GridList>
                          */
