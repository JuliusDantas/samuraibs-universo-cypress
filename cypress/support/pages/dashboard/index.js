import { el } from "./elements";
import toast from "../../components/toast";
import alertfieldForm from "../../components/alert";
import header from "../../components/header";

class DashPage {
  constructor() {
    this.toast = toast;
    this.alertfieldForm = alertfieldForm;
    this.header = header;
  }
}

export default new DashPage();
