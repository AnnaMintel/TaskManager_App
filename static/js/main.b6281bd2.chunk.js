(this["webpackJsonptodolist-13"]=this["webpackJsonptodolist-13"]||[]).push([[0],{104:function(t,e,n){"use strict";n.r(e);var c=n(6),r=n(0),i=n.n(r),a=n(11),o=n.n(a),s=(n(89),function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,149)).then((function(e){var n=e.getCLS,c=e.getFID,r=e.getFCP,i=e.getLCP,a=e.getTTFB;n(t),c(t),r(t),i(t),a(t)}))}),u=(n(90),n(37)),l=n(145),d=n(135),f=n(136),j=i.a.memo((function(t){var e=Object(r.useState)(""),n=Object(u.a)(e,2),i=n[0],a=n[1],o=Object(r.useState)(null),s=Object(u.a)(o,2),j=s[0],O=s[1],b=function(){""!==i.trim()?(t.addItem(i),a("")):O("Title is required")};return Object(c.jsxs)("div",{children:[Object(c.jsx)(l.a,{variant:"outlined",error:!!j,value:i,onChange:function(t){a(t.currentTarget.value)},onKeyPress:function(t){null!==j&&O(null),13===t.charCode&&b()},label:"Title",helperText:j}),Object(c.jsx)(d.a,{color:"primary",onClick:b,children:Object(c.jsx)(f.a,{})})]})})),O=i.a.memo((function(t){var e=Object(r.useState)(!1),n=Object(u.a)(e,2),i=n[0],a=n[1],o=Object(r.useState)(t.value),s=Object(u.a)(o,2),d=s[0],f=s[1];return i?Object(c.jsx)(l.a,{value:d,onChange:function(t){f(t.currentTarget.value)},autoFocus:!0,onBlur:function(){a(!1),t.onChange(d)}}):Object(c.jsx)("span",{onDoubleClick:function(){a(!0),f(t.value)},children:t.value})})),b=n(138),p=n(137),T=n(147),h=n(22),v=i.a.memo((function(t){Object(h.c)((function(t){return t}));var e=Object(r.useCallback)((function(){return t.removeTask(t.task.todolistId,t._id)}),[t.task.todolistId,t._id]),n=Object(r.useCallback)((function(e){t.updateTask(t.task.todolistId,t._id,t.title,e.currentTarget.checked)}),[t.task.todolistId,t._id,t.title]),i=Object(r.useCallback)((function(e){t.updateTask(t.task.todolistId,t._id,e,t.isDone)}),[t.task.todolistId,t._id,t.isDone]);return Object(c.jsxs)("div",{className:t.task.isDone?"is-done":"",children:[Object(c.jsx)(T.a,{checked:t.task.isDone,color:"primary",onChange:n}),Object(c.jsx)(O,{value:t.task.title,onChange:i}),Object(c.jsx)(d.a,{onClick:e,children:Object(c.jsx)(p.a,{})})]},t.task.todolistId)})),k=i.a.memo((function(t){var e=Object(h.c)((function(t){return t.tasks})),n="active"===t.filter?e[t._id].filter((function(t){return!1===t.isDone})):"completed"===t.filter?e[t._id].filter((function(t){return!0===t.isDone})):e[t._id],i=Object(r.useCallback)((function(e){t.addTask(t._id,e)}),[t.addTask,t._id]),a=Object(r.useCallback)((function(e){t.changeTodolistTitle(t._id,e)}),[t._id,t.changeTodolistTitle]),o=Object(r.useCallback)((function(){return t.changeFilter("all",t._id)}),[t._id,t.changeFilter]),s=Object(r.useCallback)((function(){return t.changeFilter("active",t._id)}),[t._id,t.changeFilter]),u=Object(r.useCallback)((function(){return t.changeFilter("completed",t._id)}),[t._id,t.changeFilter]);return Object(c.jsxs)("div",{children:[Object(c.jsxs)("h3",{children:[Object(c.jsx)(O,{value:t.title,onChange:a}),Object(c.jsx)(d.a,{onClick:function(){t.removeTodolist(t._id)},children:Object(c.jsx)(p.a,{})})]}),Object(c.jsx)(j,{addItem:i}),Object(c.jsx)("div",{children:null===n||void 0===n?void 0:n.map((function(e){return Object(c.jsx)(v,{task:e,todolistId:t._id,_id:e._id,title:e.title,isDone:e.isDone,updateTask:t.updateTask,removeTask:t.removeTask},e._id)}))}),Object(c.jsxs)("div",{style:{paddingTop:"10px"},children:[Object(c.jsx)(b.a,{variant:"all"===t.filter?"outlined":"text",onClick:o,color:"default",children:"All"}),Object(c.jsx)(b.a,{variant:"active"===t.filter?"outlined":"text",onClick:s,color:"primary",children:"Active"}),Object(c.jsx)(b.a,{variant:"completed"===t.filter?"outlined":"text",onClick:u,color:"secondary",children:"Completed"})]})]})})),x=n(146),_=n(139),m=n(140),I=n(142),C=n(143),g=n(144),S=n(105),D=n(141),y=n(14),E=n.n(y),A=n(24),w=n(38),L=n(18),F=n(74).a.create({baseURL:"https://annatodolist.herokuapp.com/"}),K=function(){return F.get("todo-lists")},N=function(t){return F.post("todo-lists",{title:t})},G=function(t){return F.delete("todo-lists/".concat(t))},H=function(t,e){return F.put("todo-lists/".concat(t),{title:e})},R=function(t){return F.get("todo-lists/".concat(t,"/tasks"))},M=function(t,e){return F.post("todo-lists/".concat(t,"/tasks"),{title:e})},V=function(t,e,n,c){return F.put("todo-lists/".concat(t,"/tasks/").concat(e),{title:n,isDone:c})},B=function(t,e){return F.delete("todo-lists/".concat(t,"/tasks/").concat(e))},P={},U=function(t,e){return{type:"SET-TASKS",tasks:t,todolistId:e}},J=function(t,e){return{type:"ADD-TASK",todolistId:t,newTask:e}},q=function(t,e,n,c){return{type:"CHANGE-TASK-STATUS",todolistId:t,_id:e,title:n,isDone:c}},z=function(t,e,n,c){return{type:"CHANGE-TASK-TITLE",todolistId:t,_id:e,title:n,isDone:c}},Q=function(t,e){return{type:"REMOVE-TASK",todolistId:t,_id:e}},W=[],X=function(t){return{type:"ADD-TODOLIST",title:t,todolistId:Object(x.a)()}},Y=function(t,e){return{type:"CHANGE-TODOLIST-TITLE",_id:t,title:e}},Z=function(t){return{type:"REMOVE-TODOLIST",_id:t}};var $=function(){var t=Object(h.c)((function(t){return t.todolists})),e=Object(h.c)((function(t){return t.tasks})),n=Object(h.b)();Object(r.useEffect)((function(){n(function(){var t=Object(A.a)(E.a.mark((function t(e){var n;return E.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,K();case 2:(n=t.sent).data.map((function(t){return e((n=t._id,function(){var t=Object(A.a)(E.a.mark((function t(e){var c,r,i;return E.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,R(n);case 2:c=t.sent,r=c.data,i=U(r,n),e(i);case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()));var n})),e({type:"SET-TODOLISTS",todolists:n.data});case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}),[n]),Object(x.a)(),Object(x.a)();var i=Object(r.useCallback)((function(t,e){n(function(t,e){return function(){var n=Object(A.a)(E.a.mark((function n(c){return E.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,M(t,e).then((function(e){return c(J(t,e.data))})).catch((function(t){return console.log(t)}));case 2:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}()}(t,e))}),[n]),a=Object(r.useCallback)((function(t,e,c,r){n(function(t,e,n,c){return function(){var r=Object(A.a)(E.a.mark((function r(i){return E.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,V(t,e,n,c).then((function(r){i(z(t,e,n,c)),i(q(t,e,n,c))})).catch((function(t){return console.log(t)}));case 2:case"end":return r.stop()}}),r)})));return function(t){return r.apply(this,arguments)}}()}(t,e,c,r))}),[n]),o=Object(r.useCallback)((function(t,e){n(function(t,e){return function(){var n=Object(A.a)(E.a.mark((function n(c){return E.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,B(t,e);case 2:n.sent,c(Q(t,e));case 4:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}()}(t,e))}),[n]),s=Object(r.useCallback)((function(t,e){var c={type:"CHANGE-TODOLIST-FILTER",_id:e,filter:t};n(c)}),[]),u=Object(r.useCallback)((function(t){n(function(t){return function(){var e=Object(A.a)(E.a.mark((function e(n){return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N(t);case 2:e.sent,n(X(t));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}(t))}),[n]),l=Object(r.useCallback)((function(t){n(function(t){return function(){var e=Object(A.a)(E.a.mark((function e(n){return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,G(t);case 2:e.sent,n(Z(t));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}(t))}),[n]),f=Object(r.useCallback)((function(t,e){n(function(t,e){return function(){var n=Object(A.a)(E.a.mark((function n(c){return E.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,H(t,e);case 2:n.sent,c(Y(t,e));case 4:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}()}(t,e))}),[n]);return Object(c.jsxs)("div",{className:"App",children:[Object(c.jsx)(_.a,{position:"static",children:Object(c.jsxs)(m.a,{children:[Object(c.jsx)(d.a,{edge:"start",color:"primary","aria-label":"menu",children:Object(c.jsx)(D.a,{})}),Object(c.jsx)(I.a,{variant:"h6",children:"TaskManager"})]})}),Object(c.jsxs)(C.a,{fixed:!0,children:[Object(c.jsx)(g.a,{container:!0,style:{padding:"20px"},children:Object(c.jsx)(j,{addItem:u})}),Object(c.jsx)(g.a,{container:!0,spacing:3,children:t.map((function(t){var n=e[t._id];return Object(c.jsx)(g.a,{item:!0,children:Object(c.jsx)(S.a,{style:{padding:"10px"},children:Object(c.jsx)(k,{_id:t._id,title:t.title,tasks:n,removeTask:o,changeFilter:s,addTask:i,updateTask:a,filter:t.filter,removeTodolist:l,changeTodolistTitle:f})})},t._id)}))})]})]})},tt=n(36),et=n(73),nt=Object(tt.c)({tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"SET-TASKS":var n=Object(L.a)({},t);return n[e.todolistId]=e.tasks,n;case"ADD-TASK":var c=Object(L.a)({},t),r=e.newTask,i=c[e.todolistId],a=[r].concat(Object(w.a)(i));return c[e.todolistId]=a,c;case"CHANGE-TASK-TITLE":var o=t[e.todolistId],s=o.map((function(t){return t._id===e._id?Object(L.a)(Object(L.a)({},t),{},{title:e.title}):t}));return t[e.todolistId]=s,Object(L.a)({},t);case"CHANGE-TASK-STATUS":var u=t[e.todolistId],l=u.map((function(t){return t._id===e._id?Object(L.a)(Object(L.a)({},t),{},{isDone:e.isDone}):t}));return t[e.todolistId]=l,Object(L.a)({},t);case"REMOVE-TASK":var d=Object(L.a)({},t),f=d[e.todolistId],j=f.filter((function(t){return t._id!==e._id}));return d[e.todolistId]=j,d;case"REMOVE-TODOLIST":var O=Object(L.a)({},t);return delete O[e._id],O;default:return t}},todolists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:W,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"SET-TODOLISTS":return e.todolists.map((function(t){return Object(L.a)(Object(L.a)({},t),{},{filter:"all"})}));case"ADD-TODOLIST":return[{_id:e.todolistId,title:e.title,filter:"all"}].concat(Object(w.a)(t));case"CHANGE-TODOLIST-TITLE":var n=t.find((function(t){return t._id===e._id}));return n&&(n.title=e.title),Object(w.a)(t);case"CHANGE-TODOLIST-FILTER":var c=t.find((function(t){return t._id===e._id}));return c&&(c.filter=e.filter),Object(w.a)(t);case"REMOVE-TODOLIST":return t.filter((function(t){return t._id!==e._id}));default:return t}}}),ct=Object(tt.d)(nt,Object(tt.a)(et.a));window.store=ct,o.a.render(Object(c.jsx)(i.a.StrictMode,{children:Object(c.jsx)(h.a,{store:ct,children:Object(c.jsx)($,{})})}),document.getElementById("root")),s()},89:function(t,e,n){},90:function(t,e,n){}},[[104,1,2]]]);
//# sourceMappingURL=main.b6281bd2.chunk.js.map