import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
// import USERLIST from '../_mocks_/user';
// import USERLIST from '../_mocks_/budgets';

//

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'code', label: 'Code', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'tender', label: 'Tender', alignRight: false },
  { id: 'tender_code', label: 'Tender Code', alignRight: false },
  { id: '' }
];
const API_URL = 'http://localhost:8000/api/budget-list';

// ----------------------------------------------------------------------

export default function User() {
  const [budgetItems, setBudgets] = useState([]);
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = budgetItems.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    console.log('here in fetch data ---- ', data);
    setBudgets(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Page title="Budget | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Budget
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New Budget
          </Button>
          {/* {budgetItems} */}
        </Stack>
        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            // onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={budgetItems.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {budgetItems.map((row) => {
                    const { id, tender, code, description, tenderCode } = row;
                    const isItemSelected = selected.indexOf(tenderCode) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} />
                        </TableCell>
                        <TableCell align="left">{tender}</TableCell>
                        <TableCell align="left">{code}</TableCell>
                        <TableCell align="left">{description}</TableCell>
                        <TableCell align="left">{tenderCode}</TableCell>
                        <TableCell align="right">
                          <UserMoreMenu />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
