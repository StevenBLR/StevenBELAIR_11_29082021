import { Component } from 'react';
import styled from 'styled-components';
import Banner from '../../components/Banner';
import Button from '../../components/Buttons';
import Dropdown from '../../components/Dropdown';
import RatingStars from '../../components/RatingStars';
import Tag from '../../components/Tag';
import datas from '../../data/logements.json';
import colors from '../../utils/style/colors';
import ErrorPage from '../ErrorPage/index';

export class Logement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Passer dans componentDidMount -----------------------
            dataSet: null,
        };
    }

    // Fetch etat using componentDidMount ---------------------------
    componentDidMount() {
        this.setState({
            dataSet:
                datas.find((d) => d.id === this.props.match.params.id) || null,
            currentImgIndex: 0,
        });
    }

    previousImg = () => {
        if (this.state.currentImgIndex === 0) {
            this.setState({
                currentImgIndex: this.state.dataSet.pictures.length - 1,
            });
        } else
            this.setState({ currentImgIndex: this.state.currentImgIndex - 1 });
    };

    nextImg = () => {
        if (
            this.state.currentImgIndex ===
            this.state.dataSet.pictures.length - 1
        ) {
            this.setState({ currentImgIndex: 0 });
        } else
            this.setState({ currentImgIndex: this.state.currentImgIndex + 1 });
    };

    render() {
        const { dataSet } = this.state;

        if (dataSet != null) {
            let currentImg = dataSet.pictures[this.state.currentImgIndex];
            return (
                <LgmtStyled>
                    <Banner image={currentImg} height="415" id="lgmt-banner">
                        {dataSet.pictures.length > 1 && (
                            <div className="banner__buttons">
                                <Button
                                    icon="fas fa-chevron-left"
                                    id="banner__btn-left"
                                    action={this.previousImg}
                                />
                                <Button
                                    icon="fas fa-chevron-right"
                                    id="banner__btn-right"
                                    action={this.nextImg}
                                />
                            </div>
                        )}
                    </Banner>
                    <div className="lgmt__infos">
                        <div className="lgmt__left-bloc">
                            <h1 className="lgmt__title">{dataSet.title}</h1>
                            <h2 className="lgmt__location">
                                {dataSet.location}
                            </h2>
                            <div className="lgmt__tags">
                                {dataSet.tags.map((t) => (
                                    <Tag
                                        key={`${t}_${dataSet.id}`}
                                        name={t}
                                    ></Tag>
                                ))}
                            </div>
                        </div>
                        <div className="lgmt__right-bloc">
                            <div className="lgmt__profil-section">
                                <p>{dataSet.host.name}</p>
                                <img
                                    src={dataSet.host.picture}
                                    alt={`${dataSet.host.name} profil pic`}
                                />
                            </div>
                            <RatingStars
                                totalStars={5}
                                startValue={parseInt(dataSet.rating)}
                            />
                        </div>
                    </div>
                    <div className="lgmt__dropdowns">
                        <Dropdown
                            title="Description"
                            content={dataSet.description}
                            contentSize="18px"
                            openOnStart={true}
                        />
                        <Dropdown
                            title="Equipements"
                            content={dataSet.equipments}
                            contentSize="18px"
                            openOnStart={true}
                        />
                    </div>
                </LgmtStyled>
            );
        }
        // Else show 404 error page
        else {
            return <ErrorPage />;
        }
    }
}

export default Logement;

const styleGeneral = `
    color: ${colors.primary};
    h1,h2 {
        margin-block: 10px;
    }
    h2 {
        font-size: 18px;
    }
    .lgmt__infos {
        display: flex;
        justify-content: space-between;
        margin: 20px 0;
    }
`;

const styleLeftBloc = `
    .lgmt__tags {
        display: flex;
    }
`;

const styleRightBloc = `
    .lgmt__right-bloc {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: end;
    }
    .lgmt__tags{
        flex-wrap: wrap;
    }
    .lgmt__profil-section {
        display: flex;
        align-items: center;
        height: 70px;
    }
        .lgmt__profil-section img {
            height: 90%;
            border-radius: 100%;
        }
        .lgmt__profil-section p {
            font-size: 18px;
            margin-right: 8px;
            max-width: 100px;
            text-align: end;
        }
`;

const styleDropdownBloc = `
    .lgmt__dropdowns{
        display:flex;
        justify-content: space-between;
        min-height: 200px;
    }
    .dropdown{
        width: 46%;
        margin: unset;
        margin-bottom: 20px;
    }
        .dropdown__content p{
            font-size: 18px;
            font-weight: 400;
        }
`;

const styleCarouselBts = `
    .banner__buttons{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        display: flex;
        justify-content: space-between;
    }
    .banner__buttons i{
        position: absolute;
        font-size: 40px;
    }

    .banner__buttons .button{
        width: 100px;
    }
    .fa-chevron-left{
        left: 50px;
    }
    .fa-chevron-right{
        right: 50px;
    }
`;

const LgmtStyled = styled.div`
    ${styleGeneral}
    ${styleLeftBloc}
    ${styleRightBloc}
    ${styleDropdownBloc}
    ${styleCarouselBts}
`;
