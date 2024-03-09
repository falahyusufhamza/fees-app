import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URLS } from '../apiUrls';
import { Button, Grid, Pagination, Spin, message } from 'antd';
import './invoices.css';
import FamilyDuesList from '../components/Invoices/FamilyDuesList';
import FamilyInvoice from '../components/Invoices/FamilyInvoice';
import { DEVICE_TYPES } from '../constants/commonConstants';
import { PlusOutlined } from '@ant-design/icons';
import MakePayment from '../components/Students/MakePayment';

function Invoices() {
  const [familyDues, setFamilyDues] = useState([]);
  const [paginationData, setPaginationData] = useState();
  const [currentFamily, setCurrentFamily] = useState();
  const [familyInvoice, setFamilyInvoice] = useState();
  const [isInvoiceListLoading, setIsInvoiceListLoading] = useState(false);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const { useBreakpoint } = Grid;
  const breakPoint = useBreakpoint();

  const [deviceType, setDeviceType] = useState(DEVICE_TYPES.DESKTOP);

  useEffect(() => {
    fetchFamilyDues();
  }, []);

  useEffect(() => {
    const isDesktop = breakPoint.lg || breakPoint.xl || breakPoint.xxl;
    setDeviceType(isDesktop ? DEVICE_TYPES.DESKTOP : DEVICE_TYPES.MOBILE);
  }, [breakPoint]);

  useEffect(() => {
    if (!currentFamily) return;
    fetchFamilyInvoice(currentFamily?.familyId);
  }, [currentFamily]);

  const fetchFamilyDues = (page = 1) => {
    setIsInvoiceListLoading(true);
    axios
      .get(API_URLS.GET_FAMILY_WISE_DUES, {
        params: {
          page,
          pageSize: deviceType === DEVICE_TYPES.DESKTOP ? 10 : 8,
        },
      })
      .then((res) => {
        setIsInvoiceListLoading(false);
        setFamilyDues(res?.data?.data);
        // setCurrentFamily(res?.data?.data?.[0]);
        setPaginationData(res?.data?.paginationData);
      })
      .catch((error) => {
        setIsInvoiceListLoading(false);
        console.error(error);
        message.error('Failed to fetch dues, Please try later');
      });
  };

  const fetchFamilyInvoice = async (familyId) => {
    await axios
      .get(API_URLS.GET_FAMILY_FEE, {
        params: { familyId },
      })
      .then((response) => {
        setFamilyInvoice(response?.data?.data);
      })
      .catch((error) => {
        console.error(error);
        message.error('Something went wrong');
      });
  };

  const refreshFees = () => {
    fetchFamilyDues();
    setCurrentFamily();
  }

  return (
    <>
      <MakePayment
        isVisible={isPaymentModalVisible}
        setIsPaymentModalVisible={setIsPaymentModalVisible}
        currentFamily={currentFamily}
        pendingFeeData={familyInvoice}
        refreshFeeList={refreshFees}
      />
      <div className="dues-header">
        <h2 className="primary-color">Family wise dues</h2>
        <div className="dues-actions">
          <Button
            children="Pay fees"
            icon={<PlusOutlined />}
            disabled={!currentFamily}
            type="primary"
            onClick={() => setIsPaymentModalVisible(true)}
          />
        </div>
      </div>
      <div className="flex-wrapper">
        <div className="dues-wrapper">
          {isInvoiceListLoading ? (
            <div className="loading-wrapper">
              <Spin />
            </div>
          ) : !!familyDues?.length ? (
            <>
              <div className="dues-container">
                <FamilyDuesList
                  familyDues={familyDues}
                  handleFamilyClick={fetchFamilyInvoice}
                  setCurrentFamily={setCurrentFamily}
                  currentFamily={currentFamily}
                />
              </div>
              <Pagination
                defaultPageSize={paginationData?.pageSize}
                total={paginationData?.totalItems}
                current={paginationData?.currentPage}
                showSizeChanger={false}
                onChange={(page) => fetchFamilyDues(page)}
                simple={deviceType !== 'DESKTOP'}
              />
            </>
          ) : (
            <div className="no-pending-fees">No fees generated</div>
          )}
        </div>
        {deviceType === 'DESKTOP' && !!familyDues?.length && (
          <div className="invoice-wrapper">
            <FamilyInvoice invoiceData={familyInvoice} family={currentFamily} />
          </div>
        )}
      </div>

      <div id="invoice-pdf"></div>
    </>
  );
}

export default Invoices;
