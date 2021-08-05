import React from 'react'
import styled from '@emotion/styled'
import { Button } from '@material-ui/core'

const Header = styled.header`
  background-color: white;
  box-shadow: 0 3px 5px 0 rgb(0 0 0 / 10%);
  min-height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
`

const Title = styled.h2``

function KitchenHeader() {
  return (
    <Header>
      <div>
        <Title>Dalfins</Title>
      </div>
      <div>
        <Button variant='outlined' style={{ marginRight: 10 }}>
          Home
        </Button>
        <Button variant='outlined'>Earnings</Button>
      </div>
    </Header>
  )
}

export default KitchenHeader
