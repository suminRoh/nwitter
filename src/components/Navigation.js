import React from "react";
import {Link} from "react-router-dom";
const Navigation=({userObj})=><nav>
    <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/profile">{userObj.displayName}의 Profile </Link></li>
    </ul>

</nav>;//home과 profile로 가는 두 링크 존재
export default Navigation;