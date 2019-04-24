import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import questionJSON from '../../JSON/Byquestion';

const styles = theme => ({
    root: {
        width: '40%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 100,
    },
});

let id = 0;
function createData(questionNumber, name, value) {
    id += 1;
    return { questionNumber, name, value };
}

const rows = [];

// questionJSON.questionlist.forEach((question) => {
//     question.data.forEach((q) => {
//         rows.push(createData(question.questionNumber, q.name, q.value));
//     });
// });

fetch('http://pi.cs.oswego.edu:13126/questions')
    .then((res) => res.json())
    .then((responseJson) => {
        responseJson.questionsList.forEach((question) => {
            question.data.forEach((q) => {
                rows.push(createData(question.questionNumber, q.name, q.value));
            });
        });
    })
    .catch((error) => {
        console.error(error);
    });

function QuestionTable(props) {
    const { classes } = props;

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell >Question Number</TableCell>
                        <TableCell >Response</TableCell>
                        <TableCell >Frequency</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.questionNumber}
                            </TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

QuestionTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuestionTable);