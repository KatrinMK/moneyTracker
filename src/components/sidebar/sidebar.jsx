import React, {Component} from 'react';
import './index.css';
import {connect} from 'react-redux';
import {Day, Week, Month} from '../../actions/periodAction';
import {health, food, hygiena, home, clothes, sport, resort, mobile, transport, animals, gifts, other, all} from'../../actions/categoryAction'
import toggleShowBudget from '../../actions/budgetShowAction';
import v4 from 'uuid/v4';


const nameCategory = ['health', 'food', 'hygiena', 'home', 'clothes', 'sport', 'resort', 'mobile', 'transport', 'animals', 'gifts', 'other', 'all'];

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            periodVisablilty: false,
            costVisability: false,
            categories: ['Здоровье', 'Еда', 'Гигиена', 'Жилье', 'Одежда', 'Спорт', 'Отдых', 'Связь', 'Транспорт', 'Питомцы', 'Подарки', 'Другое', 'Все']
        };

    }

    totalCostForPeriod = (category) => {
        const arrCostFromPeriod = this.props.costs.filter(obj => obj.date >= this.props.period.start && obj.date <= this.props.period.end);
            return arrCostFromPeriod.filter((obj) => obj.category === category.toLowerCase()).reduce((acc, obj) => acc + obj.cost, 0)
    };


    // метод для меню Период
    subPeriod = () => {
        this.setState((prevState) => ({
            periodVisablilty: !prevState.periodVisablilty
        }))
    };

    // метод для меню Расходы
    subCost = () => {
        this.setState((prevState) => ({
            costVisability: !prevState.costVisability
        }))
    };

    showPeriod = (event) => {

    };

    // метод для кнопки, чтобы отрисовывать окно создания бюджета
    showCreateBudgete = () => {

    };

    render() {
        return (
            <div className='wrapper-sidebar'>
                <ul>
                    <li onClick={this.subPeriod}
                        className={`menu-item ${this.state.periodVisablilty ? 'menu-item-active' : ''}`}>Расходы
                    </li>
                    <ul className={`sub-menu ${this.state.periodVisablilty ? 'active' : ''}`}>
                        {this.state.categories.map((obj, index) => {
                            let action = nameCategory[index];
                            return (

                                <li onClick={this.props[action]} key = {v4()} className='sub-item'>
                                    {obj}
                                    <p className='sum-of-cost'>
                                        {this.totalCostForPeriod(obj)>0 && this.totalCostForPeriod(obj)}
                                    </p>
                                </li>

                            )
                        })}
                    </ul>
                    <li onClick={this.subCost}
                        className={`menu-item ${this.state.costVisability ? 'menu-item-active' : ''}`}>Период
                    </li>
                    <ul className={`sub-menu ${this.state.costVisability ? 'active' : ''}`}>
                        <li onClick={this.props.day} className='sub-item'>День</li>
                        <li onClick={this.props.week} className='sub-item'>Неделя</li>
                        <li onClick={this.props.month} className='sub-item'>Месяц</li>
                    </ul>
                    <li className='menu-item'>Статистика</li>
                </ul>
                <button className='create-btn' onClick={this.props.toggleShowBudget}>создать бюджет</button>
            </div>
        )
    }
}


const MSTP = (state) => ({
    costs: state.costs,
    period: state.period,
});

function mapDispatchToProps(dispatch) {
    return {
        toggleShowBudget: function () {
            dispatch(toggleShowBudget())
        },
        day: function () {
            dispatch(Day())
        },
        week: function () {
            dispatch(Week())
        },
        month: function () {
            dispatch(Month())
        },
        health: function () {
            dispatch(health())
        },
        food: function () {
            dispatch(food())
        },
        hygiena: function () {
            dispatch(hygiena())
        },
        home: function () {
            dispatch(home())
        },
        clothes: function () {
            dispatch(clothes())
        },
        sport: function () {
            dispatch(sport())
        },
        resort: function () {
            dispatch(resort())
        },
        mobile: function () {
            dispatch(mobile())
        },
        transport: function () {
            dispatch(transport())
        },
        animals: function () {
            dispatch(animals())
        },
        gifts: function () {
            dispatch(gifts())
        },
        other: function () {
            dispatch(other())
        },
        all: function () {
            dispatch(all())
        }
    }

}

export default connect(MSTP, mapDispatchToProps)(Sidebar);
