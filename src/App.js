import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { About } from "./Pages/About";
import { WorkerTab } from "./Pages/WorkerTab";
import { ReportTab } from "./Pages/ReportTab";
import { ControllerTab } from "./Pages/ControllerTab";
import { DefectsTab } from "./Pages/DefectsTab";
import { Statistics } from "./Pages/Statistics";
import { Navbar } from "./Components/Navbar";
import { Alert } from "./Components/Alert";
import AlertState from "./Context/Alert/AlertState";
import { FirebaseState } from "./Context/Firebase/FirebaseState";
import Test from "./Pages/Test";
import { ReportsFirebaseState } from "./Context/reportsFirebase/reportsFirebaseState";
import { ControllersFirebaseState } from "./Context/Firebase/controllersFirebaseState";
import { DefectsFirebaseState } from "./Context/Firebase/defectsFirebaseState";

function App() {
  return (
    <DefectsFirebaseState>
      <ControllersFirebaseState>
        <ReportsFirebaseState>
          <FirebaseState>
            <AlertState>
              <Router>
                <Navbar />
                <Alert />
                <Routes>
                  <Route path={"/workers"} exact element={<WorkerTab />} />
                  <Route path={"/controllers"} element={<ControllerTab />} />
                  <Route path={"/reports"} element={<ReportTab />} />
                  <Route path={"/defects"} element={<DefectsTab />} />
                  <Route path={"/statistics"} element={<Statistics />} />
                </Routes>
              </Router>
            </AlertState>
          </FirebaseState>
        </ReportsFirebaseState>
      </ControllersFirebaseState>
    </DefectsFirebaseState>
  );
}

export default App;
