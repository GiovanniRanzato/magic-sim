import { defineStore } from 'pinia'
import type { Card } from '../types/Card'
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export const useGameStore = defineStore('game', () => {
    const deck = ref<Card[]>([])
    const hand = ref<Card[]>([])
    const graveyard = ref<Card[]>([])
    const battlefield = ref({
        lands: [] as Card[],
        creatures: [] as Card[]
    })

    // ----- AZIONI PRINCIPALI -----

    function initializeDeck(cards: Card[]) {
        deck.value= cards.map(card => ({
            ...card,
            uuid: uuidv4()
        }))
    }

    function initializeGame(chosen_deck: Card[]) {
        initializeDeck(chosen_deck)
        hand.value = []
        graveyard.value = []
        battlefield.value = {
            lands: [],
            creatures: []
        }
    }

    function drawCard() {
        const card = deck.value.shift()
        if (card) hand.value.push(card)
    }

    function moveCardToGraveyard(card: Card, from: 'hand' | 'battlefield') {
        if (from === 'hand') removeCardFromArray(hand.value, card)
        if (from === 'battlefield') {
            removeCardFromArray(battlefield.value.lands, card)
            removeCardFromArray(battlefield.value.creatures, card)
        }
        graveyard.value.push(card)
    }

    function moveCardToTopOfDeck(card: Card, from: 'hand') {
        if (from === 'hand') removeCardFromArray(hand.value, card)
        deck.value.unshift(card)
    }

    function moveCardToBottomOfDeck(card: Card, from: 'hand') {
        if (from === 'hand') removeCardFromArray(hand.value, card)
        deck.value.push(card)
    }

    function playCardToBattlefield(card: Card, type: 'lands' | 'creatures') {
        removeCardFromArray(hand.value, card)
        battlefield.value[type].push(card)
    }

    function moveCardToHandFromGraveyard(card: Card) {
        removeCardFromArray(graveyard.value, card)
        hand.value.push(card)
    }

    function moveCardToBattlefieldFromGraveyard(card: Card, type: 'lands' | 'creatures') {
        removeCardFromArray(graveyard.value, card)
        battlefield.value[type].push(card)
    }

    function shuffleDeck() {
        deck.value = deck.value
            .map(card => ({ card, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ card }) => card)
    }

    // Utility per rimuovere una singola istanza
    function removeCardFromArray(array: Card[], card: Card) {
        const index = array.findIndex(c => c.uuid === card.uuid)
        if (index !== -1) array.splice(index, 1)
    }

    return {
        deck,
        hand,
        graveyard,
        battlefield,
        initializeDeck,
        initializeGame,
        drawCard,
        moveCardToGraveyard,
        moveCardToTopOfDeck,
        moveCardToBottomOfDeck,
        playCardToBattlefield,
        moveCardToHandFromGraveyard,
        moveCardToBattlefieldFromGraveyard,
        shuffleDeck
    }
})
