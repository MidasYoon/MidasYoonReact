import React, {Component} from "react";
import { withStyles } from '@material-ui/core/styles';

import Link from "@material-ui/core/Link";
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';

import { Viewer } from '@toast-ui/react-editor';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-clojure.js';

import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

import * as style from '../../common/globalStyle.js';

const useStyles = theme => ({
    files: {
        width: '100%',
        textAlign: 'right',
    },
    link: {
        display: 'block',
        cursor: 'pointer',
        "&:hover": {
            color: style.linkHoverColor,
            textDecoration: 'none',
        },
    },
    fileButton: {
        padding:0,
        color: "#000"
    },
});

class BoardBody extends Component {
    constructor(props) {
        super(props);

        this.toastViewer = React.createRef();
        this.setContentToViewer = this.setContentToViewer.bind(this);

        this.state = {
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.props.content !== nextProps.content
            || this.props.files !== nextProps.files
        );
    }

    setContentToViewer(content) {
        this.toastViewer.current.getInstance().setMarkdown(content);
    }

    render () {
        const { classes } = this.props;
        
        const { content, files } = this.props;
        const { downloadFile } = this.props;

        return (
            <React.Fragment>
                <div className={classes.files}>
                    {
                        files.map((item, index) => (
                            <Link key={index} color="inherit" className={classes.link} onClick={() => downloadFile(item.id)}>
                                <IconButton className={classes.fileButton}>&nbsp;<SaveIcon fontSize="small"/></IconButton>
                                <span>{item.clientFileName}</span>
                            </Link>
                        ))
                    }
                </div>
                <Viewer
                    ref={this.toastViewer}
                    initialValue={content}
                    plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
                />
            </React.Fragment>
        )
    }
}

BoardBody.defaultProps = {
    content: '',
    files: [],
    downloadFile: function () {},
}

export default withStyles(useStyles)(BoardBody);