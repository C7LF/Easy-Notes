import React from 'react'

import CloseIcon from '@material-ui/icons/Close';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { logoutUser } from '../../state/authActions'
import { setAccountPaneIsOpen } from '../../state/actions'
import { connect } from 'react-redux'

import { Button } from '@material-ui/core';

import logo from '../../static/md-notes.png'

import './account-pane.scss'

const mapDispatchToProps = dispatch => {
    return {
        onLogoutClick: () => dispatch(logoutUser()),
        onSetPanelIsOpenClick: (accountPaneIsOpen) => dispatch(setAccountPaneIsOpen(accountPaneIsOpen))
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        isOpen: state.accountPaneIsOpen.accountPaneIsOpen
    }
}

const AccountPane = ({
    isOpen,
    auth,
    onLogoutClick,
    onSetPanelIsOpenClick
}) => {
    const { user } = auth

    const isActive = isOpen ? 'account-pane--active' : ''
    const isActiveBackground = isOpen ? 'backdrop--active' : ''

    return (
        <>
            <div className={`account-pane ${isActive}`}>
                <div className="account-pane__header">
                    <CloseIcon className="account-pane__close-icon" onClick={() => onSetPanelIsOpenClick(false)} />
                </div>
                <div className="account-pane__content">
                    <AccountCircleIcon className="account-pane__account-icon" />
                    <p className='account-pane__username'>{user.name}</p>
                    <Button onClick={() => onLogoutClick()} variant="contained" color="primary">
                        Log Out
                    </Button>
                </div>
                <div className="account-pane__footer">
                    <img src={logo} width="150px" alt="md-notes logo" />
                </div>
            </div>
            <div className={`backdrop ${isActiveBackground}`} onClick={() => onSetPanelIsOpenClick(false)} />
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPane)