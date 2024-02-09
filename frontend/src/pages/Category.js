import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';import { toast } from 'react-toastify';

// @mui
import {
    Card,
    Table,
    Stack,
    Paper,
    Avatar,
    Button,
    Popover,
    Checkbox,
    TableRow,
    MenuItem,
    TableBody,
    TableCell,
    Container,
    Typography,
    IconButton,
    TableContainer,
    TablePagination,
} from '@mui/material';

// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { getBrandList } from '../api/brand';
import { AddCategory, CategoryListHead, CategoryListToolBar } from '../sections/@dashboard/category';

// mock
import USERLIST from '../_mock/user';
import { category } from '../_mock/category';
import { getCategoryList, updateCategory, createCategory, deleteCategoy } from '../api/category';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'description', label: 'Description', alignRight: false },
    { id: 'imageurl', label: 'Image', alignRight: false },

    { id: '' },
];


// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}
const initialValues = {
    id: '',
    name: '',
    description: '',
    imageUrl: ''
}
export default function Category() {
    const [open, setOpen] = useState(null);
    const [openAddPopUp, setAddPopUp] = useState(false);
    const [isAddProductLoading, setIsAddProductLoading] = useState(false);

    const [total, setTotal] = useState(0);
    const [categoryList, setCategoryList] = useState([]);
    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [categoryToBeUpdated, setCategoryToBeUpdated] = useState({
        id: '',
        name: '',
        description: '',
        imageUrl: ''
    });

    const handleOpenMenu = (event, id) => {
        console.log(event)
        console.log(id)
        const category = categoryList.find(brand => brand.id === id)
        console.log(category)
        setCategoryToBeUpdated(category)
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };
    const handleSubmit = async (data) => {
        try {
            setIsAddProductLoading(true);
            if (data.id !== '') {
                await updateCategory(data.id, data)
                // const index = category.categoryList.findIndex(category => category.id === data.id)
                // category.categoryList[index] = data;
             
            } else {
                delete data.id
                await createCategory(data)
                // data.id = category.categoryList.length + 1;
                // data.imageurl = null;
                // category.categoryList.push(data);
                // category.count = category.categoryList.length
                // console.log(data);
            }
            setCategoryToBeUpdated({
                id: '',
                name: '',
                description: '',
                imageUrl: ''
            })
            await getCategoryListData()
            setIsAddProductLoading(false);
            setAddPopUp(false);
            setOpen(null);
            console.log(categoryList.length);
        } catch (error) {
          
            console.log(error)
        }
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = USERLIST.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleChangePage =async  (event, newPage) => {
        setPage(newPage);
        console.log(newPage)
    };

    const handleChangeRowsPerPage =async  (event) => {
       setPage(0);
         setRowsPerPage(parseInt(event.target.value, 10));         
       console.log(page)
       console.log(rowsPerPage,"iunsdie")


    };

    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    }; 
    const handleDelete = async (event) => {
        if (categoryToBeUpdated.id !== '') {
            await deleteCategoy(categoryToBeUpdated.id);
        }
        await getCategoryListData();
                    setOpen(null);


  
    };
    const getCategoryListData = async () => {
        try {
            const data = {
                page: page + 1,
                limit: rowsPerPage,
                keyword: filterName
            }
            console.log(data)
            const categoryRes =await getCategoryList(data);
            const { categoryList, count } = categoryRes.data
            console.log(categoryList)
            setTotal(count);
            setCategoryList(categoryList)
        } catch (error) {
         
            console.log(error)
        }
    };
    useEffect(() => {     
        getCategoryListData();

    }, [page,rowsPerPage,filterName])

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

    // const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

    const isNotFound = !categoryList.length && !!filterName;

    return (
        <>
            <Helmet>
                <title> Category </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Category
                    </Typography>
                    <Button variant="contained" onClick={() => { setCategoryToBeUpdated(initialValues); setAddPopUp(true) }} startIcon={<Iconify icon="eva:plus-fill" />}>
                        Add Category
                    </Button>
                </Stack>

                <Card>
                    <CategoryListToolBar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <CategoryListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={total}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {categoryList.map((row) => {
                                        const { id, name, description, imageurl } = row;
                                        const selectedUser = selected.indexOf(name) !== -1;

                                        return (
                                            <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                                                {/* <TableCell padding="checkbox">
                                                    <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                                                </TableCell> */}

                                                <TableCell align="left">

                                                    <Typography variant="subtitle2" noWrap>
                                                        {name}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell align="left">{description}</TableCell>

                                                <TableCell align="left" >
                                                    <Stack direction="row" alignItems="center" spacing={2}>
                                                        <Avatar alt={name} src={imageurl} />

                                                    </Stack>
                                                </TableCell>



                                                <TableCell align="left">
                                                    <IconButton size="large" color="inherit" onClick={(event) => { handleOpenMenu(event, id) }}>
                                                        <Iconify icon={'eva:more-vertical-fill'} />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>


                                {isNotFound && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                                <Paper
                                                    sx={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <Typography variant="h6" paragraph>
                                                        Not found
                                                    </Typography>

                                                    <Typography variant="body2">
                                                        No results found for &nbsp;
                                                        <strong>&quot;{filterName}&quot;</strong>.
                                                        <br /> Try checking for typos or using complete words.
                                                    </Typography>
                                                </Paper>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={total}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Container>

            <AddCategory open={openAddPopUp} onPopUpClose={() => setAddPopUp(false)} loading={isAddProductLoading} onSubmit={handleSubmit} initialValues={categoryToBeUpdated} />
            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 1,
                        width: 140,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <MenuItem onClick={() => setAddPopUp(true)}>
                    <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                    Edit
                </MenuItem>

                <MenuItem sx={{ color: 'error.main' }}  onClick={ handleDelete}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>

        </>
    );
}
