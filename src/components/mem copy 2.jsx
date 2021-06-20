import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { initialMems } from './data';

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
    height: 800,
  },
  icon: {
    color: 'rgba(255, 255, 100, 0.54)',
  },
}));

const Mem = () => {
  const classes = useStyles();

  const [mems, setMems] = React.useState(initialMems);

  function getMem() {
    const memList = mems;
    return memList;
  }

  function filterHotMem() {
    let filtredMem = getMem().filter((type) => type.upvote - type.downvote > 5);
    return filtredMem;
  }

  function filterRegMem() {
    let filtredMem = getMem().filter(
      (type) => type.upvote - type.downvote <= 5
    );
    return filtredMem;
  }

  const [filtredMem, setFiltredMem] = React.useState();
  useEffect(() => {
    setFiltredMem(getMem());
  }, []);

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
    <div className={classes.root}>
      <>
        <div className="filtr">
          Filtry:
          <button onClick={handleHotMem}>Hot</button>
          <button onClick={handleRegMem}>Regular</button>
        </div>
      </>

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
                      color="secendary"
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
