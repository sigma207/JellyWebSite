<%--
  Created by IntelliJ IDEA.
  User: user
  Date: 2015/6/4
  Time: 下午 03:30
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<jsp:useBean id="mySql" class="com.jelly.backend.MySql" scope="session"/>
<%
    try {
        mySql.connected();
        mySql.query("select * from bulletin");

    } catch (Exception e) {
        System.out.println("can't load mysql jdbc driver");
    }
%>
<html>
<head>
    <title></title>
    <script type="text/javascript" src="../js/jquery-1.11.2.min.js"></script>
    <script>
        $(document).ready(function () {

        });
    </script>
</head>
<body>

</body>
</html>
