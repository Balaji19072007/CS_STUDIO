import { supabase } from '../config/supabase';

/**
 * Quiz API - Fetch quiz data from Supabase
 */

// Get quizzes for a phase
export const getQuizzes = async (phaseId) => {
    try {
        const { data, error } = await supabase
            .from('quizzes')
            .select('*')
            .eq('phase_id', phaseId)
            .order('order_index');

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        return [];
    }
};

// Get single quiz by ID
export const getQuiz = async (quizId) => {
    try {
        const { data, error } = await supabase
            .from('quizzes')
            .select('*')
            .eq('id', quizId)
            .maybeSingle();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching quiz:', error);
        throw error;
    }
};

// Get quiz questions
export const getQuizQuestions = async (quizId) => {
    try {
        const { data, error } = await supabase
            .from('quiz_questions')
            .select('*')
            .eq('quiz_id', quizId)
            .order('order_index');

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error fetching quiz questions:', error);
        return [];
    }
};

// Get question options for a question
export const getQuestionOptions = async (questionId) => {
    try {
        const { data, error } = await supabase
            .from('quiz_question_options')
            .select('*')
            .eq('question_id', questionId)
            .order('order_index');

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error fetching question options:', error);
        return [];
    }
};

// Get all questions with their options (optimized)
export const getQuizQuestionsWithOptions = async (quizId) => {
    try {
        // First get all questions
        const questions = await getQuizQuestions(quizId);

        // Then get options for all questions
        const questionsWithOptions = await Promise.all(
            questions.map(async (question) => {
                const options = await getQuestionOptions(question.id);
                return {
                    ...question,
                    options
                };
            })
        );

        return questionsWithOptions;
    } catch (error) {
        console.error('Error fetching quiz questions with options:', error);
        throw error;
    }
};

// Submit quiz attempt
export const submitQuizAttempt = async (userId, quizId, answers, score, passed) => {
    try {
        // Insert quiz attempt
        const { data: attempt, error: attemptError } = await supabase
            .from('user_quiz_attempts')
            .insert({
                user_id: userId,
                quiz_id: quizId,
                score: score,
                passed: passed,
                completed_at: new Date().toISOString()
            })
            .select()
            .single();

        if (attemptError) throw attemptError;

        // Insert individual answers
        const answerInserts = answers.map(answer => ({
            attempt_id: attempt.id,
            question_id: answer.questionId,
            selected_answer: answer.selectedAnswer,
            is_correct: answer.isCorrect
        }));

        const { error: answersError } = await supabase
            .from('user_quiz_answers')
            .insert(answerInserts);

        if (answersError) throw answersError;

        return attempt;
    } catch (error) {
        console.error('Error submitting quiz attempt:', error);
        throw error;
    }
};

// Get user's quiz attempts
export const getUserQuizAttempts = async (userId, quizId) => {
    try {
        const { data, error } = await supabase
            .from('user_quiz_attempts')
            .select('*')
            .eq('user_id', userId)
            .eq('quiz_id', quizId)
            .order('completed_at', { ascending: false });

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching user quiz attempts:', error);
        throw error;
    }
};

// Check if user passed a quiz
export const hasUserPassedQuiz = async (userId, quizId) => {
    try {
        const { data, error } = await supabase
            .from('user_quiz_attempts')
            .select('passed')
            .eq('user_id', userId)
            .eq('quiz_id', quizId)
            .eq('passed', true)
            .limit(1);

        if (error) throw error;
        return data && data.length > 0;
    } catch (error) {
        console.error('Error checking quiz pass status:', error);
        return false;
    }
};
