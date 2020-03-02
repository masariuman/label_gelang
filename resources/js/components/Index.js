import React, { Component } from "react";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            cari: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderCari = this.renderCari.bind(this);
    }

    handleChange(e) {
        this.setState({
            cari: e.target.value
        });
        // console.log(e.target.value);
    }

    handleSubmit(e) {
        e.preventDefault();
        axios
            .post("/", {
                cari: this.state.cari
            })
            .then(response => {
                this.setState({
                    data: [response.data.cari],
                    cari: ""
                });
                // console.log("from handle sumit", response);
                // console.log(this.state.data);
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    renderCari() {
        if (!this.state.data[0]) {
            return this.state.data.map(data => (
                <div key="1">DATA TIDAK ADA</div>
            ));
        } else {
            return this.state.data.map(data => (
                <div key="1">
                    <a
                        href={`/${data.no_rkm_medis}/label`}
                        className="btn btn-success btn-xs"
                        target="_blank"
                    >
                        <i className="fa fa-print"></i> Cetak Label
                    </a>
                    <a
                        href={`/${data.no_rkm_medis}/gelang_dewasa`}
                        className="btn btn-primary btn-xs"
                        target="_blank"
                    >
                        <i className="fa fa-print"> Cetak Gelang Dewasa</i>
                    </a>
                    <a
                        href={`/${data.no_rkm_medis}/gelang_anak`}
                        className="btn btn-warning btn-xs"
                        target="_blank"
                    >
                        <i className="fa fa-print"></i> Cetak Gelang Anak
                    </a>
                    <a
                        href={`/${data.no_rkm_medis}/gelang_anak`}
                        className="btn btn-danger btn-xs"
                        target="_blank"
                    >
                        <i className="fa fa-print"></i> Cetak Tracer
                    </a>
                    <table border="0">
                        <tbody>
                            <tr>
                                <td>No MR</td>
                                <td>:</td>
                                <td>{data.no_rkm_medis}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ));
        }
    }

    componentDidMount() {}

    componentDidUpdate() {}

    render() {
        return (
            <div>
                <div className="app-page-title">
                    <div className="page-title-wrapper">
                        <div className="page-title-heading">
                            <div className="page-title-icon">
                                <i className="pe-7s-print icon-gradient bg-happy-green"></i>
                            </div>
                            <div>
                                LABEL & GELANG
                                <div className="page-title-subheading">
                                    Halaman ini berfungsi untuk mencetak Label
                                    dan Gelang.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-card mb-3 card">
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input
                                    onChange={this.handleChange}
                                    value={this.state.cari}
                                    className="form-control-lg form-control"
                                    placeholder="Cari Nomor Rekam Medis"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn-square btn-hover-shine btn btn-success"
                            >
                                <a className="pe-7s-search"></a> CARI / KLIK
                                ENTER UNTUK CARI
                            </button>
                        </form>
                        <hr />
                        <p></p>
                        {this.renderCari()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;
