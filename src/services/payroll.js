import API from "./api";

// 1. Get current payroll
export const getCurrentPayroll = async () => {
  const res = await API.get("/payroll/current");
  return res.data;
};

// 2. Calculate payroll
export const calculatePayroll = async (payrollId) => {
  const res = await API.post(`/payroll/${payrollId}/calculate`);
  return res.data;
};

// 3. Tax breakdown
export const getTaxBreakdown = async (annualGross) => {
  const res = await API.post("/payroll/tax-breakdown", {
    annualGross,
  });
  return res.data;
};