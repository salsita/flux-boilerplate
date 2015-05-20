import React from 'react';
import TodoList from './components/TodoList';

import './stores/TodoListStore';

React.render(<TodoList />, document.getElementById('app'));
