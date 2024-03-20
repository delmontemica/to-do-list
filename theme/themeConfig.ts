import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  token: {
    fontSize: 16,
  },
  components: {
    Progress: {
      remainingColor: "white",
      defaultColor: "#60c6ff",
    },
    Checkbox: {
      colorPrimary: "#526F92",
      colorPrimaryHover: "#526F92",
      colorBorder: "#526F92",
      lineWidth: 2,
      paddingXS: 14
    }
  },
};

export default theme;