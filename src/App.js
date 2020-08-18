import React from 'react';
import './App.css';
import {Button, Input, Modal, Tabs, Divider} from 'antd';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleOfCreateTodo: false,
            visibleOfEditTodo: false,
            visibleOfSearchTodo: false,

            todoList: ["吃饭", "睡觉"],

            createInputValue: '',
            willBeEditTodo: '',
            newTodoValue: '',
            searchResult: []

        }
    }


    //创建按钮函数
    showCreateTodoModal = () => {
        this.setState({
            visibleOfCreateTodo: true,
        });
    };
    handleCreateTodoModalDoOk = e => {
        console.log(e);
        this.setState({
            visibleOfCreateTodo: false,
        });
        let {createInputValue} = this.state
        this.state.todoList.push(createInputValue)
    };
    handleCreateTodoModalCancel = e => {
        console.log(e);
        this.setState({
            visibleOfCreateTodo: false,
        });
    };
    handleCreateInputValue = (e) => {
        console.log(e.target.value);
        this.setState({createInputValue: e.target.value})
    }

    //编辑按钮函数
    handleEditTodoModal = (todo) => {
        this.setState({
            willBeEditTodo: todo,
            visibleOfEditTodo: true,
        });
    };
    handleEditTodoModalDoOk = e => {
        let afterEditTodoList = this.editTodo(this.state.todoList, this.state.willBeEditTodo, this.state.newTodoValue)
        this.setState({
            visibleOfEditTodo: false,
            todoList: afterEditTodoList,
        });

    };
    handleEditTodoModalCancel = e => {

        this.setState({
            visibleOfEditTodo: false,
        });
    };
    handleEditInputValue = (e) => {
        this.setState({
            newTodoValue: e.target.value
        })

    };
    editTodo = (array, editedTodo, newTodoValue) => {
        return array.map((item) => {
            return item === editedTodo ? newTodoValue : item
        })
    }

    //删除按钮函数
    handleDeleteTodoList = (willBeDeletedTodo) => {
        this.setState({
            todoList: this.deleteTodo(willBeDeletedTodo)
        })
    };
    deleteTodo = (willBeDeletedTodo) => {
        return (this.state.todoList.filter((todo) => {
            return (todo !== willBeDeletedTodo)
        }))
    };

    //搜索按钮函数
    handleSearchInputValue = (e) => {
        let allSearchResult = this.searchResultTodo(e)
        this.setState({
            searchResult: allSearchResult
        })
    };
    searchResultTodo = (e) => {
        return (this.state.todoList.filter((item) => {
            return (item === e)
        }))
    };




    render() {
        const {Search} = Input;
        const {TabPane} = Tabs;
        return (
            <React.Fragment>
                <div className="App">
                    <Button type="primary" onClick={this.showCreateTodoModal}>增加todo</Button>
                    <Search
                        placeholder="搜索todo"
                        onSearch={value => this.handleSearchInputValue(value)}

                        style={{width: 200}}
                    />
                    <Divider/>
                    <ul>搜索结果
                        {this.state.searchResult.map((item) => {
                            return (
                                <div>
                                    <li key={item}>{item}</li>
                                </div>
                            )
                        })}
                    </ul>
                    <Divider/>

                    <Tabs defaultActiveKey="1">
                        <TabPane tab="未完成" key="1">
                            <ul>
                                {this.state.todoList.map((item) => {
                                    return (
                                        <div>
                                            <li key={item}>{item}</li>
                                            <Button onClick={
                                                () => {
                                                    this.handleDeleteTodoList(item)
                                                }
                                            }>删除</Button>
                                            <Button onClick={
                                                () => {
                                                    this.handleEditTodoModal(item)
                                                }
                                            }>编辑</Button>
                                        </div>
                                    )
                                })}
                            </ul>
                        </TabPane>
                        <TabPane tab="已完成" key="2">
                        </TabPane>
                    </Tabs>
                </div>
                <Modal
                    title="增加todo事项"
                    visible={this.state.visibleOfCreateTodo}
                    onOk={this.handleCreateTodoModalDoOk}
                    onCancel={this.handleCreateTodoModalCancel}
                >
                    <Input placeholder="请输入要增加的todo事项" onChange={this.handleCreateInputValue}/>
                </Modal>

                <Modal
                    title="编辑todo事项"
                    visible={this.state.visibleOfEditTodo}
                    onOk={this.handleEditTodoModalDoOk}
                    onCancel={this.handleEditTodoModalCancel}
                >
                    <Input placeholder="请输入要编辑的todo事项" onChange={this.handleEditInputValue}/>
                </Modal>
            </React.Fragment>
        )
    }
}

export default App;
