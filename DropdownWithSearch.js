function DropdownWithSearch(props) {
  /*
    Label: label felirat
    datas: [{id: 1, name: 'valami', telephely: 'telephely neve'}]. ilyen formátumban kell lennie, a telephely opcionális, a teljes adattömb 
    value: [{id: 1, name: 'valami', telephely: 'telephely neve'}]. ilyen formátumban kell lennie, a kiválasztott sorokat tartalmazza
    onChange: visszaadja a kiválasztott sor adattömbjét: [{id: 1, name: 'valami', telephely: 'telephely neve'}]
    pl.: onChange={(data) => handler(data)}
    importálni kell: 

    import { makeStyles, useTheme } from '@material-ui/core/styles';
    
    import {
      FormControl,
      InputLabel,
      Select,
      Input,
      Chip,
      TextField,
      MenuItem,
      Checkbox,
      InputAdornment,
      ListSubheader,
      ListItemText
  } from '@material-ui/core';

  import SearchIcon from '@material-ui/icons/Search';
  */
  const [selectedDatas, setSelectedDatas] = useState([]);
  const [searchText, setSearchText] = useState("");

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      width: "90%"
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const label = props.label;
  const classes = useStyles();
  const theme = useTheme();

  const filteredItems = props.datas.filter(item => {
    return item.name.toString().toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
  });

  function getStyles(value, array, theme) {
    return {
      fontWeight:
        array.map(object => object.UGYFELKOD).indexOf(value) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleChange = (e) => {
    const id = e.currentTarget.dataset.id
    
    if(id != undefined) {
        const element = props.datas.find((item) => item.id == id && item);
        
        if(selectedDatas.find((item) => {
            if(item.id == id) return true
        })) {
          const setData = selectedDatas.filter((item) => item.id != id)
          setSelectedDatas(setData);
          props.onChange(setData);
        }
        else {
          const setData = [...selectedDatas, element]
          setSelectedDatas(setData);
          props.onChange(setData);
        }
    }
};

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-mutiple-chip-label">{label}</InputLabel>
      <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={props.value}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
              <div className={classes.chips}>
                {selected.map((row, index) => (
                    <Chip key={index} label={row.name} className={classes.chip} />
                ))}
              </div>
          )}
          MenuProps={MenuProps}
      >
          <ListSubheader>
              <TextField
              size="small"
              autoFocus
              placeholder="Keresés..."
              fullWidth
              InputProps={{
                  startAdornment: (
                  <InputAdornment position="start">
                      <SearchIcon />
                  </InputAdornment>
                  )
              }}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Escape") {
                  e.stopPropagation();
                }
              }}
              style={{ backgroundColor: "#fff" }}
              />
          </ListSubheader>
          {filteredItems.map((row, index) => {
              if(index < 100 ) return (
                  <MenuItem key={index} value={row.name} data-id={row.id} style={getStyles(row.id, selectedDatas, theme)}>
                      <Checkbox checked={selectedDatas.map(object => object.id).indexOf(row.id) > -1} />
                      <ListItemText primary={row.name} secondary={<Fragment>{row.telephely && row.telephely}</Fragment>}/>
                  </MenuItem>)
              })}
      </Select>
  </FormControl>
  )
}
