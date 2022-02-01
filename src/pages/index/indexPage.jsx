import React, {Component} from "react";
import Layout from '../../components/layout/layout.jsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import BoardNoticeList from './component/boardNoticeList.jsx';
import GalleyIndex from './component/galleryIndex.jsx';
import TrackIndex from './component/trackIndex.jsx';

class IndexPage extends Component {
    render () {
        return (
            <Layout>
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4} sm={6}>
                            <BoardNoticeList/>
                        </Grid>
                        <Grid item xs={12} md={4} sm={6}>
                            <GalleyIndex/>
                        </Grid>
                        <Grid item xs={12} md={4} sm={6}>
                            <TrackIndex/>
                        </Grid>
                    </Grid>
                </Container>
            </Layout>
        )
    }
}

export default IndexPage;