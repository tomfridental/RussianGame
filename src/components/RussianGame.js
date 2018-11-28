import React, { Component } from 'react';
import styled from 'styled-components'

class RussianGame extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gameSize: 3,
            cells: [],
            finish_option1: [],
            finish_option2: []
        }
        this.moveDivs = this.moveDivs.bind(this);
        this.shuffleArr = this.shuffleArr.bind(this);
        this.randomCells = this.randomCells.bind(this);
        this.validateBoard = this.validateBoard.bind(this);
        this.createMatrix = this.createMatrix.bind(this);
        this.createSolution = this.createSolution.bind(this)
    }

    moveDivs(row, col) {
        const cellArr = this.state.cells
        if (cellArr[row][col] != null) {
            const tempNum = cellArr[row][col];

            if (cellArr[row][col - 1] === null) {
                cellArr[row][col] = null;
                cellArr[row][col - 1] = tempNum;
                this.setState({ cells: cellArr })
                console.log('Num Moved to the Left')

            }

            else if (cellArr[row][col + 1] === null) {
                cellArr[row][col] = null;
                cellArr[row][col + 1] = tempNum;
                this.setState({ cells: cellArr })
                console.log('Num Moved to the Right')

            }

            if (row != 0) {
                if (cellArr[row - 1][col] === null) {
                    cellArr[row][col] = null;
                    cellArr[row - 1][col] = tempNum;
                    this.setState({ cells: cellArr })
                    console.log('Num Moved Up')

                }
            }

            if (row != (this.state.gameSize - 1)) {
                if (cellArr[row + 1][col] === null) {
                    cellArr[row][col] = null;
                    cellArr[row + 1][col] = tempNum;
                    this.setState({ cells: cellArr })
                    console.log('Num Moved Down')
                }
            }

        }
        if (this.validateBoard(this.state.cells)) {
            alert('Game is Done!')
        }

    }

    shuffleArr(arr) {
        let len = arr.length;
        if (len == null) return;
        while (--len) {
            const j = Math.floor(Math.random() * (len + 1));
            const temp = arr[len];
            arr[len] = arr[j];
            arr[j] = temp;
        }
        return arr;
    }

    randomCells() {
        let boardNums = [null];

        for (let i = 1; i < (this.state.gameSize * this.state.gameSize); i++) {
            boardNums.push(i)
        }
        this.createSolution(boardNums)
        boardNums = this.shuffleArr(boardNums)
        const afterRandomArr = this.createMatrix(boardNums)
        this.setState({ cells: afterRandomArr })
    }

    createMatrix(arr) {
        let afterMatrix = [];
        let partArr = []
        for (let i = 0; i < arr.length; i++) {
            if (partArr.length < this.state.gameSize) {
                partArr.push(arr[i])
                if (partArr.length === this.state.gameSize) {
                    afterMatrix.push(partArr);
                    partArr = []
                }
            }
        }
        return afterMatrix;
    }
    
    createSolution(arr) {
        let solution = this.createMatrix(arr)
        this.setState({finish_option1: solution})
        arr.shift()
        arr.push(null)
        solution = this.createMatrix(arr)
        this.setState({finish_option2: solution})
    }

    validateBoard(arr) {
        if (JSON.stringify(this.state.finish_option1) == JSON.stringify(arr)) return true;
        if (JSON.stringify(this.state.finish_option2) == JSON.stringify(arr)) return true;

        return false;
    }


    componentDidMount() {
        this.randomCells()
    }


    render() {
        return (
            <Main>
                <GameFrame gameSize={this.state.gameSize}>
                    {
                        this.state.cells.map((row, i) => (row.map((col, y) =>
                            <Num key={col} value={this.state.cells[i][y]} onClick={() => this.moveDivs(i, y)}>
                                {col}
                            </Num> //
                        )
                        )
                        )
                    }


                </GameFrame>
                <Refresh onClick={() => this.randomCells()}>Refresh</Refresh>
            </Main>
        )

    }
};

export default RussianGame;


//CSS//

const Main = styled.div`
background-color: white;
min-height: 720px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
font-size: 3rem;
padding: 30px 0px;
background-color: #e9ebee;
`

const GameFrame = styled.div`
width: ${props => props.gameSize * 182}px;
height: ${props => props.gameSize * 182}px;
background-color: green;
display: flex;
flex-wrap: wrap;
`

const Num = styled.div`
width: 180px;
height: 180px;
border: 1px solid black;
background-color: ${props => props.value === null ? "white" : "grey"};
display: flex;
justify-content: center;
align-items: center;
`

const Refresh = styled.button`
margin-top: 10px;
width: 100px;
height: 50px;
background-color: darkcyan;
`

//
{/* <Num key={0} value={this.state.cells[0][0]} onClick={() => this.moveDivs(0, 0)}>{this.state.cells[0][0]}</Num>
                    <Num key={1} value={this.state.cells[0][1]} onClick={() => this.moveDivs(0, 1)}>{this.state.cells[0][1]}</Num>
                    <Num key={2} value={this.state.cells[0][2]} onClick={() => this.moveDivs(0, 2)}>{this.state.cells[0][2]}</Num>
                    <Num key={3} value={this.state.cells[1][0]} onClick={() => this.moveDivs(1, 0)}>{this.state.cells[1][0]}</Num>
                    <Num key={4} value={this.state.cells[1][1]} onClick={() => this.moveDivs(1, 1)}>{this.state.cells[1][1]}</Num>
                    <Num key={5} value={this.state.cells[1][2]} onClick={() => this.moveDivs(1, 2)}>{this.state.cells[1][2]}</Num>
                    <Num key={6} value={this.state.cells[2][0]} onClick={() => this.moveDivs(2, 0)}>{this.state.cells[2][0]}</Num>
                    <Num key={7} value={this.state.cells[2][1]} onClick={() => this.moveDivs(2, 1)}>{this.state.cells[2][1]}</Num>
                    <Num key={8} value={this.state.cells[2][2]} onClick={() => this.moveDivs(2, 2)}>{this.state.cells[2][2]}</Num> */}