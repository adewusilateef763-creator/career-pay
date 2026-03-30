import API from "./api";

// GET COMPANY DETAILS
export const getCompanyDetails = async () => {
  const res = await API.get("/company");
  return res.data;
};

// UPDATE COMPANY DETAILS
export const updateCompanyDetails = async (data) => {
  const res = await API.put("/company", data);
  return res.data;
};

// GET COMPANY EMPLOYEES
export const getCompanyEmployees = async () => {
  const res = await API.get("/employees");
  return res.data;
};

// ADD EMPLOYEE
export const addEmployee = async (data) => {
  const res = await API.post("/employees", data);
  return res.data;
};

// GET DEPARTMENTS
export const getDepartments = async () => {
  const res = await API.get("/departments");
  return res.data;
};

// GET COMPANY STATS
export const getCompanyStats = async () => {
  const res = await API.get("/company/stats");
  return res.data;
};
