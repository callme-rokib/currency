import { Row, Col, Table } from 'react-bootstrap';
import { URL } from '../conf';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { numberFormat } from './numberFormat';

const TableCurrency = () => {
  const [currencies, setCurrency] = useState([]);

  useEffect(() => {
    getAllCurrency();
  }, []);

  const getAllCurrency = () => {
    Axios.get(`${URL}/currency`)
      .then((response) => {
        const AllCurrency = response.data;
        setCurrency(AllCurrency);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Row>
      <Col md={12}>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Currencies</th>
              <th>Value</th>
              <th>Sell</th>
              <th>Buy</th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((currency, id) => (
              <tr key={id}>
                <td>{currency.id}</td>
                <td>{currency.currencies}</td>
                <td>{numberFormat(currency.value)}</td>
                <td>{numberFormat(currency.sell)}</td>
                <td>{numberFormat(currency.buy)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
      <Col md={12}>
        <span>* Base currency is IDR</span> <br />
        <span>* Last Update 19 July 2021</span> <br />
        <span>* Foreign Exchange Rates From Bank Indonesia</span>
      </Col>
    </Row>
  );
};

export default TableCurrency;
