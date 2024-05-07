import React from "react";
import Layout from "./PageLayout";
const WithLayout = (WrappedComponent) => {
  return (props) => (
    <Layout>
      <WrappedComponent/>
    </Layout>
  );
};

export default WithLayout;
