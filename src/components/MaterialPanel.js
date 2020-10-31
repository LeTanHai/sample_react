import React from "react";
import PropTypes from "prop-types";
import { materialPanelStyles } from "./Sidebar/sidebarStyles";

const MaterialTitlePanel = props => {
  const rootStyle = props.style
    ? { ...materialPanelStyles.root, ...props.style }
    : materialPanelStyles.root;
  const headerStyle = props.style.header? {...props.style.header} : materialPanelStyles.header;
  return (
    <div style={rootStyle}>
      <div style={headerStyle}>{props.title}</div>
      <div style={materialPanelStyles.dividerHeader} />
      {props.children}
    </div>
  );
};

MaterialTitlePanel.propTypes = {
  style: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default MaterialTitlePanel;